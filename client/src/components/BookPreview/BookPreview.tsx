import { useNavigate } from 'react-router-dom';
import { Book, Stack } from '../../utils/types';
import { deleteBookFromStack } from '../../services/APIClient';
import { getCoverUrl } from '../../services/OpenLibrary';

import './BookPreview.css';

import defaultIcon from '/assets/default-book-icon.png';
import editIcon from '/assets/edit.svg';
import deleteIcon from '/assets/trash.svg';
import { useAppDispatch, useAppSelector } from '../../store';
import {
  removeBookFromAllStacks,
  removeBookFromStack,
  setCurrentStack,
} from '../../store/slices/stackSlice';
import { deleteBook } from '../../store/slices/bookSlice';

type BookPreviewProps = {
  bookId: number;
  viewedFrom: Stack;
};

export default function BookPreview({ bookId, viewedFrom }: BookPreviewProps) {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const book : Book | undefined = useAppSelector((state) => state.book.books[bookId]);

  async function onDelete() {
    await deleteBookFromStack(book!.id, viewedFrom.id, viewedFrom.type);
    if (viewedFrom.type !== 'other') {
      console.log(book!.stacks)
      dispatch(
        removeBookFromAllStacks({
          bookId: book!.id,
          stackIds: book!.stacks.map((stack) => stack.stackId),
        })
      );
      dispatch(deleteBook(book!.id));
    } else {
      dispatch(removeBookFromStack({ stackId: viewedFrom.id, bookId }));
    }
  }

  function goToEditBook() {
    dispatch(setCurrentStack(viewedFrom));
    navigate('/forms/book', { state: { book, edit: true } });
  }

  function viewBook() {
    dispatch(setCurrentStack(viewedFrom));
    navigate('/book', { state: { bookId: book!.id } });
  }

  if (book == null) {
    return <></>;
  }

  let imgUrl = defaultIcon;
  if (book.hasImg) {
    imgUrl = getCoverUrl('olid', book.OLID) + '-M.jpg';
  }

  return (
    <div className='book-container grid'>
      <img
        onClick={viewBook}
        className='large-cover-img'
        src={imgUrl}
        alt={`The cover of ${book.title}`}
      />
      <div className='book-info'>
        <h3>
          {book.title != null && book.title!.length > 20
            ? `${book.title?.substring(0, 30)}...`
            : book.title}
        </h3>
        <h4>
          by{' '}
          {book.author != null && book.author!.length > 30
            ? `${book.author?.substring(0, 30)}...`
            : book.author}
        </h4>
        <div className='description'>
          <h5>Description:</h5>
          <p>
            {book.description != null && book.description!.length > 50
              ? `${book.description?.substring(0, 47)}...`
              : book.description}
          </p>
        </div>
      </div>
      <div className='action-buttons'>
        <img
          className='img-button edit-button'
          onClick={goToEditBook}
          src={editIcon}
        />
        <img
          className='img-button delete-button'
          onClick={onDelete}
          src={deleteIcon}
        />
      </div>
    </div>
  );
}
