import { useNavigate } from 'react-router-dom';
import { Book, Stack } from '../../utils/types';
import { deleteBookFromStack } from '../../services/APIClient';
import defaultIcon from '../../assets/default-book-icon.png'
import { getCoverUrl } from '../../services/OpenLibrary';

type BookPreviewProps = {
  book: Book;
  viewedFrom: Stack;
  resetStack: () => void;
};

export default function BookPreview({ book, viewedFrom, resetStack }: BookPreviewProps) {
  const navigate = useNavigate();

  async function onDelete() {
    await deleteBookFromStack(book.id, viewedFrom.id, viewedFrom.type);
    resetStack()
  }

  function goToEditBook() {
    navigate('/forms/book', { state: { stack: viewedFrom, book, edit: true} });
  }

  let imgUrl = defaultIcon;
  if (book.hasImg) {
    imgUrl = getCoverUrl('olid', book.OLID) + '-M.jpg'; 
  }

  return (
    <div className='book-container grid'>
      <img className='large-cover-img' src={imgUrl} alt={`The cover of ${book.title}`} />
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
          <button onClick={() => navigate('/book', { state: { bookId: book.id, viewedFrom } })}>
            View
          </button>
          <button onClick={goToEditBook}>Edit</button>
          <button onClick={onDelete}>Delete</button>
        </div>
      </div>
    </div>
  );
}
