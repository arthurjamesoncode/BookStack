import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Book, Stack } from '../types';
import BookPreview from './BookPreview';

import '../styles/StackView.css';
import { getBooksInStack } from '../services/APIClient';

export default function StackView() {
  const location = useLocation();

  const { stack } = location.state as { stack: Stack };
  const [books, setBooks] = useState([] as Book[]);

  useEffect(() => {
    getBooksInStack(stack.id).then((newBooks) => setBooks(newBooks));
  }, [stack.id]);

  return (
    <div className='stack-view-container'>
      <h2>{stack.name}</h2>
      <div className='book-list'>
        {books.map((book) => {
          return (
            <div key={book.id} className='book-list-item'>
              <BookPreview viewedFrom={stack} book={book} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
