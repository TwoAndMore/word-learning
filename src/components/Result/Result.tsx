import './Result.scss';
import React, { useEffect, useState } from 'react';

export const Result: React.FC = () => {
  const [score, setScore] = useState('0');

  useEffect(() => {
    setScore(JSON.parse(localStorage.getItem('score') || score));
  }, []);

  return (
    <div className="result">
      <h2 className="result__title">
        Your result is
      </h2>

      <div className="result__value">
        {score}
        %
      </div>
    </div>
  );
};
