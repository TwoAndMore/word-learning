import './Dictionary.scss';
import React from 'react';
import { v4 as uuid4 } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';
import { selectWords, setWords } from '../../features/wordsSlice';
import { startWords } from '../../helpers/startWords';

export const Dictionary: React.FC = () => {
  const dispatch = useDispatch();
  const words = useSelector(selectWords);

  const handleAutofill = () => dispatch(setWords(startWords));

  return (
    <div className="dictionary">
      <h1 className="dictionary__title">
        {words.length > 0 ? ('Your words') : 'Add a few words'}
      </h1>

      {words.length > 0 ? (
        <div className="dictionary__words">
          <table className="dictionary__table">
            <thead>
              <tr>
                <th>№</th>
                <th>Word</th>
                <th>Translation</th>
              </tr>
            </thead>

            <tbody>
              {words.map((word, index) => (
                <tr key={uuid4()}>
                  <td>{index + 1}</td>
                  <td>{word.original}</td>
                  <td>{word.translation}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <button
          type="button"
          className="dictionary__button button"
          onClick={handleAutofill}
        >
          Autofill
        </button>
      )}
    </div>
  );
};
