import './WordCard.scss';
import React from 'react';
import { useSelector } from 'react-redux';
import { v4 as uuid4 } from 'uuid';
import { selectRandomWords } from '../../features/wordsSlice';
import { randomizeArray } from '../../helpers/randomizeArray';
import { RootState } from '../../app/store';
import { word } from '../../types/word';

type Props = {
  currentWord: word,
  handleChooseAnswer: (correct: string, chosen: string) => void;
};

export const WordCard: React.FC<Props> = (props) => {
  const { currentWord, handleChooseAnswer } = props;

  const wrongWords = useSelector((state: RootState) => {
    return selectRandomWords(state, currentWord.translation, 3);
  }).map(oldWord => oldWord.translation);

  const answers: string[] = [
    currentWord.translation,
    ...wrongWords,
  ];

  const shuffledArray = randomizeArray(answers);

  return (
    <div className="wordCard">
      <div className="wordCard__title">
        {currentWord.original}
      </div>

      <div className="wordCard__answers">
        {[...Array(4)].map((_, index) => (
          <button
            className="wordCard__answer"
            type="button"
            onClick={() => handleChooseAnswer(currentWord.translation, shuffledArray[index])}
            key={uuid4()}
          >
            {shuffledArray[index]}
          </button>
        ))}
      </div>
    </div>
  );
};
