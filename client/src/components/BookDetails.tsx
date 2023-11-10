import { useLocation } from 'react-router-dom';
import { Book } from '../types';

import '../styles/BookDetails.css';

export default function BookDetails() {
  const location = useLocation();
  const { book } = location.state as { book: Book };

  return (
    <div className='container'>
      <h2 className='book-title'>{book.title}</h2>
      <div className='book-details-container'>
        <div className='grid'>
          <img className='large-cover-img' alt={`The cover of ${book.title}`} />
          <div className='main-info'>
            <h4>Author:</h4>
            <p>{book.author}</p>
            <h4>Publisher:</h4>
            <p>{book.publisher || 'No publisher saved'}</p>
            <h4>Type of Book:</h4>
            <p>{book.bookType}</p>
            <h4>Identifiers:</h4>
            <h4>ISBN:</h4>
            <p>{book.ISBN || 'No ISBN saved'}</p>
            <h4>OLID:</h4>
            <p>{book.ISBN || 'No OLID saved'}</p>
          </div>
        </div>
        <div className='progress-container'>
          {book.currentPage <= 1
            ? "You haven't started reading yet"
            : `Page: ${book.currentPage}/${book.totalPages}`}
        </div>
        <div className='description-container'>
          <h4>Description:</h4>
          <p>{book.description}</p>
        </div>
        <div className='action-container'>
          <button>View</button>
          <button>Edit</button>
          <button>Delete</button>
          <button>
            {book.currentPage <= 1 ? 'Start Reading' : 'Update Progress'}
          </button>
        </div>
      </div>
    </div>
  );
}
