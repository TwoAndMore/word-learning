import './WordsTest.scss';
import React, { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { v4 as uuid4 } from 'uuid';
import { selectWords } from '../../features/wordsSlice';
import { WordCard } from '../WordCard/WordCard';
import { word } from '../../types/word';
import { randomizeArray } from '../../helpers/randomizeArray';

export const WordsTest: React.FC = () => {
  const [currentItemNumber, setCurrentItemNumber] = useState(0);
  const [score, setScore] = useState(0);
  const [isStarted, setIsStarted] = useState(false);

  const minTestWords = 10;
  const words = useSelector(selectWords);
  const navigate = useNavigate();

  const canPlay = useMemo(() => words.length >= minTestWords, [words]);
  const getRandomWords = (amount: number) => randomizeArray<word>(words).slice(0, amount);
  const handleStartClick = () => setIsStarted(true);
  const handleChooseAnswer = (correct: string, chosen: string) => {
    if (chosen === correct) {
      setScore(prev => prev + 1);
    }

    setCurrentItemNumber((prev) => prev + 1);
  };

  const wordsPool: word[] = useMemo(() => getRandomWords(minTestWords), []);

  useEffect(() => {
    const progress = ((score / minTestWords) * 100).toFixed(2);

    localStorage.setItem('score', JSON.stringify(progress));
  }, [score]);

  useEffect(() => {
    if (currentItemNumber === minTestWords) {
      navigate('/result');
    }
  }, [currentItemNumber]);

  return (
    <div className="wordsTest">
      {!canPlay ? (
        <h2 className="wordsTest__title wordsTest__title--error">
          The dictionary must contain at least
          {` ${minTestWords} words`}
        </h2>
      ) : (
        <>
          {!isStarted && (
            <h2 className="wordsTest__title wordsTest__title--access">
              Check yourself!
            </h2>
          )}
        </>
      )}

      {!isStarted ? (
        <button
          className="wordsTest__button button"
          type="button"
          onClick={handleStartClick}
          disabled={!canPlay}
        >
          Repeat the words
        </button>
      ) : (
        <>
          {currentItemNumber !== minTestWords && (
            <div className="wordsTest__test">
              <div className="wordsTest__counter">
                {currentItemNumber + 1}
                /
                {minTestWords}
              </div>
              <WordCard
                currentWord={wordsPool[currentItemNumber]}
                handleChooseAnswer={handleChooseAnswer}
                key={uuid4()}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};
