import { useLocation } from 'react-router-dom';
import { Book, Stack } from '../types';
import BookPreview from './BookPreview';

import '../styles/StackView.css';

export default function StackView() {
  const location = useLocation();

  const { stack, books } = location.state as { stack: Stack; books: Book[] };

  return (
    <div className='stack-view-container'>
      <h2>{stack.title}</h2>
      <div className='book-list'>
        {books.map((book) => {
          return (
            <div className='book-list-item'>
              <BookPreview book={book} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
