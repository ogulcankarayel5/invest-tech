import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import filmReducer from './slices/film.slice';

export const store = configureStore({
  reducer: {
    films: filmReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
