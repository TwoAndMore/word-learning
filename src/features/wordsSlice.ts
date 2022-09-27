import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../app/store';
import { word } from '../types/word';
import { randomizeArray } from '../helpers/randomizeArray';

export type WordsState = {
  words: word[],
  minTestWords: number,
};

const initialState: WordsState = {
  words: [],
  minTestWords: 10,
};

export const wordsSlice = createSlice({
  name: 'words',
  initialState,
  reducers: {
    setWords: (state, action: PayloadAction<word[]>) => {
      state.words = action.payload;
    },
  },
});

export const selectWords = (state: RootState) => state.words.words;
export const selectMinToTest = (state: RootState) => state.words.minTestWords;
export const selectRandomWords = (
  state: RootState,
  currentTranslation: string,
  amount: number,
): word[] => {
  const { words } = state.words;

  const filteredWords = words
    .filter(oldWord => oldWord.translation !== currentTranslation);

  return randomizeArray(filteredWords).slice(0, amount);
};

export const {
  setWords,
} = wordsSlice.actions;

export default wordsSlice.reducer;
