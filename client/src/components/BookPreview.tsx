import { useNavigate } from 'react-router-dom';
import { Book, Stack } from '../types';
import { deleteBookFromStack } from '../services/APIClient';

type BookPreviewProps = {
  book: Book;
  viewedFrom: Stack;
};

export default function BookPreview({ book, viewedFrom }: BookPreviewProps) {
  const navigate = useNavigate();

  function onDelete() {
    deleteBookFromStack(book.id, viewedFrom.id, viewedFrom.type);
  }

  function goToEditBook() {
    navigate('/forms/book', { state: { stack: viewedFrom, book } });
  }

  return (
    <div className='book-container grid'>
      <img className='large-cover-img' alt={`The cover of ${book.title}`} />
      <div className='book-info'>
        <h3>{book.title}</h3>
        <h4>by {book.author}</h4>
        <div className='description'>
          <h5>Description:</h5>
          <p>
            {book.description != null && book.description!.length > 50
              ? `${book.description?.substring(0, 47)}...`
              : book.description}
          </p>
        </div>
        <div className='action-buttons'>
          <button onClick={() => navigate('/book', { state: { bookId: book.id } })}>
            View
          </button>
          <button onClick={goToEditBook}>Edit</button>
          <button onClick={onDelete}>Delete</button>
        </div>
      </div>
    </div>
  );
}
