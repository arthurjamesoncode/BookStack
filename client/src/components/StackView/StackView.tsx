import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Book, Stack } from '../../utils/types';
import BookPreview from '../BookPreview/BookPreview';

import './StackView.css';
import { getBooksInStack } from '../../services/APIClient';

export default function StackView() {
  const location = useLocation();

  const { stack } = location.state as { stack: Stack };
  const [books, setBooks] = useState([] as Book[]);

  useEffect(() => {
    getBooks()
  }, [stack.id]);

  async function getBooks () {
    const newBooks = await getBooksInStack(stack.id);
    setBooks(newBooks)
  }

  return (
    <div className='stack-view-container'>
      <h2>{stack.name}</h2>
      <div className='book-list'>
        {books.map((book) => {
          return (
            <div key={book.id} className='book-list-item'>
              <BookPreview resetStack={getBooks} viewedFrom={stack} book={book} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
