import './AddAWord.scss';
import React, { FormEvent, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectWords, setWords } from '../../features/wordsSlice';
import { word } from '../../types/word';

export const AddAWord: React.FC = () => {
  const [original, setOriginal] = useState('');
  const [translation, setTranslation] = useState('');

  const dispatch = useDispatch();
  const words = useSelector(selectWords);

  const clearFields = () => {
    setOriginal('');
    setTranslation('');
  };

  const handleSubmitForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newWord: word = {
      original,
      translation,
    };

    dispatch(setWords([...words, newWord]));

    clearFields();
  };

  const canSubmit = useMemo(() => {
    return original.length > 0 && translation.length > 0;
  }, [original, translation]);

  return (
    <div className="addAWord">
      <form
        className="addAWord__form"
        onSubmit={handleSubmitForm}
      >
        <label
          className="addAWord__label"
          htmlFor="word"
        >
          <p className="addAWord__label-text">Word</p>
          <input
            type="text"
            className="addAWord__input"
            value={original}
            onChange={(event) => setOriginal(event.target.value)}
            placeholder="word"
            required
            autoComplete="off"
            id="word"
          />
        </label>

        <label
          className="addAWord__label"
          htmlFor="translation"
        >
          <p className="addAWord__label-text">Translation</p>
          <input
            type="text"
            className="addAWord__input"
            value={translation}
            onChange={(event) => setTranslation(event.target.value)}
            placeholder="translation"
            required
            autoComplete="off"
            id="translation"
          />
        </label>

        <button
          type="submit"
          className="addAWord__button button"
          disabled={!canSubmit}
        >
          Add a Word
        </button>
      </form>
    </div>
  );
};
