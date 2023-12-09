import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Stack } from '../../utils/types';

type StackState = {
  stacks: Stack[];
};

const initialState: StackState = {
  stacks: [],
};

const stackSlice = createSlice({
  name: 'stack',
  initialState,
  reducers: {
    setStacks: (state, action: PayloadAction<Stack[]>) => {
      state.stacks = action.payload;
    },
    addStack: (state, action: PayloadAction<Stack>) => {
      state.stacks.push(action.payload);
    },
  },
});

export const { setStacks, addStack } = stackSlice.actions;

export default stackSlice.reducer;
