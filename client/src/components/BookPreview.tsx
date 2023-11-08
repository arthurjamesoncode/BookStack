import { Book } from '../types';

type BookPreviewProps = {
  book: Book;
};

export default function BookPreview({ book }: BookPreviewProps) {
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
        </div>
      </div>
  );
}
