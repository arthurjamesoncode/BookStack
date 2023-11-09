import { useLocation, useNavigate } from 'react-router-dom';
import { Book, Stack } from '../types';
import BookPreview from './BookPreview';

import '../styles/StackView.css';
import { deleteBookFromStack } from '../services/APIClient';

export default function StackView() {
  const location = useLocation();
  const navigate = useNavigate();

  const { stack, books } = location.state as { stack: Stack; books: Book[] };

  function goToEditBook(book: Book) {
    navigate('forms/book', { state: { stack, book } });
  }

  function deleteBook(bookId: number) {
    deleteBookFromStack(bookId, stack.id, stack.type);
  }

  return (
    <div className='stack-view-container'>
      <h2>{stack.title}</h2>
      <div className='book-list'>
        {books.map((book) => {
          return (
            <div key={book.id} className='book-list-item'>
              <BookPreview
                deleteBook={deleteBook}
                goToEditBook={goToEditBook}
                book={book}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
