import { createSlice } from '@reduxjs/toolkit';

export interface CounterState {
  status: 'idle' | 'loading' | 'failed';
}

const initialState: CounterState = {
  status: 'idle',
};

export const counterSlice = createSlice({
  name: 'example',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {},
});

export default counterSlice.reducer;
