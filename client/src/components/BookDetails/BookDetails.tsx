import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Book, Stack } from '../../utils/types';
import { deleteBookFromStack, getBookById } from '../../services/APIClient';
import { getCoverUrl } from '../../services/OpenLibrary';

import './BookDetails.css';

import defaultIcon from '../../assets/default-book-icon.png';
import editIcon from '../../assets/edit.svg';
import deleteIcon from '../../assets/trash.svg';
import readingIcon from '../../assets/book-open.svg';

const blankBook: Book = {
  id: -1,
  title: '',
  author: '',
  totalPages: 0,
  bookType: 'paper',
  currentPage: 0,
  publisher: '',
  ISBN: '',
  OLID: '',
  description: '',
  hasImg: false,
};

export default function BookDetails() {
  const location = useLocation();
  const navigate = useNavigate();

  const { bookId, viewedFrom } = location.state as {
    bookId: number;
    viewedFrom: Stack;
  };
  const [book, setBook] = useState(blankBook);

  useEffect(() => {
    getBookById(bookId).then((newBook) => setBook(newBook));
  }, [bookId]);

  function goToEditBook() {
    navigate('/forms/book', {
      state: {
        stack: { title: viewedFrom.name, id: viewedFrom.id },
        book,
        edit: true,
      },
    });
  }

  async function onDelete() {
    await deleteBookFromStack(book.id, viewedFrom.id, viewedFrom.type);
    navigate(-1);
  }

  const imgUrl = book.hasImg
    ? getCoverUrl('olid', book.OLID) + '-L.jpg'
    : defaultIcon;

  return (
    <div className='container'>
      <h2 className='book-title'>{book.title}</h2>
      <div className='book-details-container'>
        <div className='grid'>
          <img
            className='large-cover-img'
            src={imgUrl}
            alt={`The cover of ${book.title}`}
          />
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
          <img className='img-button' onClick={goToEditBook} src={editIcon} />
          <img
            className='img-button'
            onClick={() => onDelete()}
            src={deleteIcon}
          />
          <img className='img-button' src={readingIcon} />
        </div>
      </div>
    </div>
  );
}
