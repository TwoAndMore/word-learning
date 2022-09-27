import { configureStore } from '@reduxjs/toolkit';
import wordsReducer from '../features/wordsSlice';
import scoreReducer from '../features/scoreSlice';

export const store = configureStore({
  reducer: {
    words: wordsReducer,
    score: scoreReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
