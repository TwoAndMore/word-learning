import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../app/store';

export type WordsState = {
  score: number,
  scoreHistory: number[],
};

const initialState: WordsState = {
  score: 0,
  scoreHistory: [],
};

export const scoreSlice = createSlice({
  name: 'score',
  initialState,
  reducers: {
    setScore: (state, action: PayloadAction<number>) => {
      state.score = action.payload;
    },
    setScoreHistory: (state, action: PayloadAction<number[]>) => {
      state.scoreHistory = action.payload;
    },
  },
});

export const selectScore = (state: RootState) => state.score.score;
export const selectScoreHistory = (state: RootState) => state.score.scoreHistory;

export const {
  setScore,
  setScoreHistory,
} = scoreSlice.actions;

export default scoreSlice.reducer;
