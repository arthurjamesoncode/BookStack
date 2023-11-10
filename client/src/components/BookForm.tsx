import { useLocation, useNavigate } from 'react-router-dom';
import { FormEvent, useState } from 'react';

import '../styles/AddBookForm.css';
import { addNewBookToStack, editBook } from '../services/APIClient';
import { Book, Stack } from '../types';

const blankFormVals = {
  title: '',
  author: '',
  totalPages: 0,
  bookType: 'paper',
  publisher: '',
  ISBN: '',
  OLID: '',
  description: '',
} as { [key: string]: number | string };

export default function BookForm() {
  const location = useLocation();
  const navigate = useNavigate();

  const { stack, book} = location.state as {
    stack: Stack;
    book: { [key: string]: number | string };
  };

  let initialFormVals: { [key: string]: number | string } = blankFormVals;
  let edit = false;

  if (book) {
    initialFormVals = book;
    edit = true;
  }

  const [formVals, setFormVals] = useState(initialFormVals);

  function onFormChange(e: FormEvent<HTMLInputElement | HTMLTextAreaElement>) {
    let key: string = e.currentTarget.id;
    let value: string | number = e.currentTarget.value;

    if (e.currentTarget.type === 'radio') key = 'bookType';
    if (e.currentTarget.type === 'number') value = Number(value);

    setFormVals({ ...formVals, [key]: value });
  }

  function submitBook(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const book = formVals as unknown as Book;

    console.log(edit);

    if (!edit) addNewBookToStack(stack.id, 'current', book);
    else editBook(book).then((result) => console.log(result));

    navigate(-1)
  }

  return (
    <div className='form-container'>
      <h2>{edit ? 'Edit Book' :`Add New Book To ${stack.title}`}</h2>
      <form onSubmit={submitBook}>
        <div className='field'>
          <label htmlFor='title'>Title:</label>
          <input
            value={formVals.title}
            onChange={onFormChange}
            type='text'
            id='title'
            placeholder='Enter book title...'
            required
          />
        </div>

        <div className='field'>
          <label htmlFor='author'>Author:</label>
          <input
            value={formVals.author}
            onChange={onFormChange}
            type='text'
            id='author'
            placeholder='Enter author name...'
            required
          />
        </div>

        <div className='field'>
          <label htmlFor='totalPages'>Total Pages:</label>
          <input
            value={formVals.totalPages}
            onChange={onFormChange}
            type='number'
            id='totalPages'
            placeholder='Enter page total...'
            required
          />
        </div>

        <div className='field'>
          <label htmlFor='publisher'>Publisher:</label>
          <input
            value={formVals.publisher}
            onChange={onFormChange}
            type='text'
            id='publisher'
            placeholder='Enter publisher...'
          />
        </div>

        <div className='field'>
          <label>Book type:</label>
          <div className='book-type'>
            <div className='radio-button'>
              <label htmlFor='paper'>Paper: </label>
              <input
                checked={formVals.bookType === 'paper'}
                onChange={onFormChange}
                type='radio'
                id='paper'
                value='paper'
                name='book-type'
              />
            </div>
            <div className='radio-button'>
              <label htmlFor='e-book'>E-Book: </label>
              <input
                checked={formVals.bookType === 'e-book'}
                onChange={onFormChange}
                type='radio'
                id='e-book'
                value='e-book'
                name='book-type'
              />
            </div>
            <div className='radio-button'>
              <label htmlFor='paper'>Audio Book: </label>
              <input
                checked={formVals.bookType === 'audio-book'}
                onChange={onFormChange}
                type='radio'
                id='audio-book'
                value='audio-book'
                name='book-type'
              />
            </div>
          </div>
        </div>

        <div className='field'>
          <label htmlFor='isbn'>ISBN:</label>
          <input
            value={formVals.ISBN}
            onChange={onFormChange}
            type='text'
            id='idbn'
            placeholder='Enter ISBN...'
          />
        </div>

        <div className='field'>
          <label htmlFor='olid'>OLID:</label>
          <input
            value={formVals.OLID}
            onChange={onFormChange}
            type='text'
            id='olid'
            placeholder='Enter OLID...'
          />
        </div>

        <div className='field'>
          <label htmlFor='description'>Description:</label>
          <textarea
            value={formVals.description}
            onChange={onFormChange}
            id='description'
            placeholder='Enter a description...'
          />
        </div>

        <button type='submit'>{edit ? 'Edit Book' : 'Add Book'}</button>
      </form>
    </div>
  );
}
