import './WordsTest.scss';
import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { v4 as uuid4 } from 'uuid';
import { selectMinToTest, selectWords } from '../../features/wordsSlice';
import { WordCard } from '../WordCard/WordCard';
import { word } from '../../types/word';
import { randomizeArray } from '../../helpers/randomizeArray';
import {
  selectScore,
  selectScoreHistory,
  setScore,
  setScoreHistory,
} from '../../features/scoreSlice';

export const WordsTest: React.FC = () => {
  const [currentItemNumber, setCurrentItemNumber] = useState(0);
  const [isStarted, setIsStarted] = useState(false);

  const scoreHistory = useSelector(selectScoreHistory);
  const minTestWords = useSelector(selectMinToTest);
  const score = useSelector(selectScore);
  const words = useSelector(selectWords);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const canPlay = useMemo(() => words.length >= minTestWords, [words]);
  const getRandomWords = (amount: number) => randomizeArray<word>(words).slice(0, amount);
  const handleStartClick = () => setIsStarted(true);
  const handleChooseAnswer = (correct: string, chosen: string) => {
    let isAdd = false;

    if (chosen === correct) {
      dispatch(setScore(score + 1));

      isAdd = true;
    }

    setCurrentItemNumber((prev) => prev + 1);

    if (currentItemNumber + 1 === minTestWords) {
      dispatch(setScoreHistory([...scoreHistory, isAdd ? score + 1 : score]));
      navigate('/result');
    }
  };

  const wordsPool: word[] = useMemo(() => getRandomWords(minTestWords), []);

  useEffect(() => {
    dispatch(setScore(0));
  }, []);

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
