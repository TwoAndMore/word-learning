import './History.scss';
import React from 'react';
import { v4 as uuid4 } from 'uuid';
import { useSelector } from 'react-redux';
import { selectScoreHistory } from '../../features/scoreSlice';
import { selectMinToTest } from '../../features/wordsSlice';

export const History: React.FC = () => {
  const scoreHistory = useSelector(selectScoreHistory);
  const minTestWords = useSelector(selectMinToTest);

  return (
    <div className="history">
      {scoreHistory.length > 0 ? (
        <>
          <div className="history__words">
            <table className="history__table">
              <thead>
                <tr>
                  <th>№</th>
                  <th>Score</th>
                </tr>
              </thead>

              <tbody>
                {scoreHistory.map((score, index) => (
                  <tr key={uuid4()}>
                    <td>{index + 1}</td>
                    <td>
                      {(score / minTestWords) * 100}
                      %
                    </td>
                  </tr>
                ))}
                <tr>
                  <td>Average</td>
                  <td>
                    {((scoreHistory.reduce((a, b) => a + b) * 10) / scoreHistory.length).toFixed(2)}
                    %
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <p className="history__error">Your history is empty</p>
      )}
    </div>
  );
};
