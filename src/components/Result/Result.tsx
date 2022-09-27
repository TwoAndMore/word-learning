import './Result.scss';
import React from 'react';
import { useSelector } from 'react-redux';
import { selectScore } from '../../features/scoreSlice';
import { selectMinToTest } from '../../features/wordsSlice';

export const Result: React.FC = () => {
  const score = useSelector(selectScore);
  const minTestWords = useSelector(selectMinToTest);

  return (
    <div className="result">
      <h2 className="result__title">
        Your result is
      </h2>

      <div className="result__value">
        {(score / minTestWords) * 100}
        %
      </div>
    </div>
  );
};
