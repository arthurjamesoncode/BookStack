import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Stack } from '../../utils/types';
import {
  deleteBookFromStack,
  getBookById,
  switchPrimaryStack,
} from '../../services/APIClient';
import { getCoverUrl } from '../../services/OpenLibrary';

import './BookDetails.css';

import defaultIcon from '../../assets/default-book-icon.png';
import editIcon from '../../assets/edit.svg';
import deleteIcon from '../../assets/trash.svg';
import readingIcon from '../../assets/book-open.svg';
import ChangePageForm from '../AddReadingSession/AddReadingSession';

import { blankBook } from '../../utils/blanks';
import NoteList from '../NoteList/NoteList';
import AddNoteForm from '../../AddNoteForm/AddNoteForm';

export default function BookDetails() {
  const location = useLocation();
  const navigate = useNavigate();

  const [addNoteIsOpen, setAddNoteIsOpen] = useState(false);
  const [addReadingIsOpen, setAddReadingIsOpen] = useState(false);
  const { bookId, viewedFrom } = location.state as {
    bookId: number;
    viewedFrom: Stack;
  };

  const [book, setBook] = useState(blankBook);
  const [noteRefresh, setNoteRefresh] = useState(false);

  useEffect(() => {
    getBook();
  }, [bookId]);

  function toggleNoteForm() {
    setAddNoteIsOpen((prev) => !prev);
  }

  function togglePageForm() {
    setAddReadingIsOpen((prev) => !prev);
  }

  async function getBook() {
    const newBook = await getBookById(bookId);
    setBook(newBook);
  }

  function goToEditBook() {
    navigate('/forms/book', {
      state: {
        stack: { title: viewedFrom.name, id: viewedFrom.id },
        book,
        edit: true,
      },
    });
  }

  async function refreshNotes() {
    console.log(noteRefresh)
    setNoteRefresh(prev => !prev)
  }

  async function onDelete() {
    await deleteBookFromStack(book.id, viewedFrom.id, viewedFrom.type);
    navigate(-1);
  }

  async function finishReading() {
    const updatedBook = await switchPrimaryStack(
      book.id,
      book.primaryStack,
      'finished'
    );
    setBook(updatedBook);
  }

  async function startReading() {
    const updatedBook = await switchPrimaryStack(
      book.id,
      book.primaryStack,
      'current'
    );
    setBook(updatedBook);
  }

  const imgUrl = book.hasImg
    ? getCoverUrl('olid', book.OLID) + '-L.jpg'
    : defaultIcon;

  const progresMessage =
    book.primaryStack === 'finished'
      ? 'You have finished this book!'
      : book.currentPage < 1
      ? "You haven't started reading yet."
      : `Page: ${book.currentPage}/${book.totalPages}.`;

  return (
    <>
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
          <div className='progress-container'>{progresMessage}</div>
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
            <img
              className='img-button'
              src={readingIcon}
              onClick={togglePageForm}
            />
          </div>
        </div>
      </div>
      {book.id > -1 && <NoteList refresh={noteRefresh} openMenu={toggleNoteForm} bookId={book.id} />}

      <AddNoteForm
        book={book}
        refresh={refreshNotes}
        isOpen={addNoteIsOpen}
        closeMenu={toggleNoteForm}
      />
      <ChangePageForm
        hidePrompt={togglePageForm}
        isOpen={addReadingIsOpen}
        refresh={getBook}
        book={book}
        startReading={startReading}
        finishReading={finishReading}
      />
    </>
  );
}
