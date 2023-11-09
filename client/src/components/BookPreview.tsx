import { Book } from '../types';

type BookPreviewProps = {
  book: Book;
  goToEditBook: Function;
  deleteBook: Function;
};

export default function BookPreview({
  book,
  goToEditBook,
  deleteBook,
}: BookPreviewProps) {
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
          <button>View</button>
          <button onClick={() => goToEditBook(book)}>Edit</button>
          <button onClick={() => deleteBook(book.id)}>Delete</button>
        </div>
      </div>
    </div>
  );
}
