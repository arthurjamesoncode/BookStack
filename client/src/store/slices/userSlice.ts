import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Book, Stack } from '../../utils/types';

type userState = {
  stacks: Stack[];
  books: Record<number, Book>;
  booksInStacks: Record<number, number[]>;
};

const initialState: userState = {
  stacks: [],
  books: {},
  booksInStacks: {},
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

    addBook: (state, action: PayloadAction<Book>) => {
      state.books[action.payload.id] = action.payload;
    },

    addBooks: (state, action: PayloadAction<Book[]>) => {
      action.payload.forEach((book) => {
        state.books[book.id] = book;
      });
    },

    editBook: (state, action: PayloadAction<Book>) => {
      state.books[action.payload.id] = action.payload;
    },

    deleteBook: (state, action: PayloadAction<number>) => {
      delete state.books[action.payload];
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
      state.booksInStacks[stackId] = bookIds
    },
  },
});

export const {
  setStacks,
  addStack,
  editStack,
  deleteStack,
  addBook,
  addBooks,
  editBook,
  deleteBook,
  addBookToStack,
  setBooksInStack,
} = userSlice.actions;

export default userSlice.reducer;
