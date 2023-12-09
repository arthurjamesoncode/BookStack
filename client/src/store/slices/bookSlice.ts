import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Book } from '../../utils/types';

type BookState = {
  books: Record<number, Book>;
};

const initialState: BookState = {
  books: {},
};

const bookSlice = createSlice({
  name: 'book',
  initialState,
  reducers: {
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
  },
});

export const { addBook, addBooks, editBook, deleteBook } = bookSlice.actions;

export default bookSlice.reducer;
