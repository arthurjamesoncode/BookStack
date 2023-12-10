import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Stack } from '../../utils/types';

type userState = {
  stacks: Stack[];
  booksInStacks: Record<number, number[]>;
  currentStack: Stack | null;
};

const initialState: userState = {
  stacks: [],
  booksInStacks: {},
  currentStack: null,
};

const userSlice = createSlice({
  name: 'stack',
  initialState,
  reducers: {
    setStacks: (state, action: PayloadAction<Stack[]>) => {
      state.stacks = action.payload;
    },

    addStack: (state, action: PayloadAction<Stack>) => {
      state.stacks.push(action.payload);
    },

    editStack: (state, action: PayloadAction<Stack>) => {
      const index = state.stacks.findIndex(
        (stack) => stack.id === action.payload.id
      );
      state.stacks[index] = action.payload;
    },

    deleteStack: (state, action: PayloadAction<number>) => {
      state.stacks = state.stacks.filter(
        (stack) => stack.id !== action.payload
      );
    },

    addBookToStack: (
      state,
      action: PayloadAction<{ bookId: number; stackId: number }>
    ) => {
      const { bookId, stackId } = action.payload;
      if (!state.booksInStacks[stackId]) {
        state.booksInStacks[stackId] = [];
      }
      state.booksInStacks[stackId].push(bookId);
    },

    addNewBookToStack: (
      state,
      action: PayloadAction<{ bookId: number; stack: Stack }>
    ) => {
      const { bookId, stack } = action.payload;
      if (!state.booksInStacks[stack.id]) {
        state.booksInStacks[stack.id] = [];
      }

      const primaryStack =
        stack.type === 'other'
          ? state.stacks.find((stack) => stack.type === 'tbr')
          : null;
      if (primaryStack) state.booksInStacks[primaryStack.id].push(bookId);

      state.booksInStacks[stack.id].push(bookId);
    },

    removeBookFromStack: (
      state,
      action: PayloadAction<{ bookId: number; stackId: number }>
    ) => {
      const { bookId, stackId } = action.payload;
      state.booksInStacks[stackId] = state.booksInStacks[stackId].filter(
        (id) => id !== bookId
      );
    },

    setBooksInStack: (
      state,
      action: PayloadAction<{ bookIds: number[]; stackId: number }>
    ) => {
      const { bookIds, stackId } = action.payload;
      state.booksInStacks[stackId] = bookIds;
    },

    removeBookFromAllStacks: (
      state,
      action: PayloadAction<{ bookId: number; stackIds: number[] }>
    ) => {
      const { bookId, stackIds } = action.payload;

      stackIds.forEach((stackId) => {
        state.booksInStacks[stackId] = state.booksInStacks[stackId].filter(
          (id) => id !== bookId
        );
      });
    },

    setCurrentStack: (state, action: PayloadAction<Stack>) => {
      state.currentStack = action.payload;
    },
  },
});

export const {
  setStacks,
  addStack,
  editStack,
  deleteStack,
  addBookToStack,
  setBooksInStack,
  setCurrentStack,
  removeBookFromAllStacks,
  removeBookFromStack,
  addNewBookToStack
} = userSlice.actions;

export default userSlice.reducer;
