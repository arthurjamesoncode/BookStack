import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Book, Stack } from '../../utils/types';
import BookPreview from '../BookPreview/BookPreview';
import { getBooksInStack } from '../../services/APIClient';

import './StackView.css';

import plusCircle from '/assets/plus-circle.svg';
import AddBookMenu from '../MenusAndForms/AddBookMenu/AddBookMenu';
import { useAppDispatch, useAppSelector } from '../../store';
import { addBooks, setBooksInStack } from '../../store/slices/userSlice';

export default function StackView() {
  const location = useLocation();
  const { stack } = location.state as { stack: Stack };

  const dispatch = useAppDispatch();

  const booksInStack = useAppSelector(
    (state) => state.user.booksInStacks[stack.id]
  );
  const [addBookOpen, setAddBookOpen] = useState(false);

  useEffect(() => {
    if (!booksInStack) getBooks();
  }, [stack.id]);

  async function getBooks() {
    const newBooks: Book[] = await getBooksInStack(stack.id);
    const newBookIds = newBooks.map((book) => book.id);

    dispatch(addBooks(newBooks));
    dispatch(setBooksInStack({ stackId: stack.id, bookIds: newBookIds }));
  }
  return (
    booksInStack != null && (
      <>
        <div className='stack-view-container'>
          <h2>{stack.name}</h2>
          <div className='book-list'>
            {booksInStack.map((bookId, index) => {
              return (
                <div key={index} className='book-list-item'>
                  <BookPreview
                    resetStack={getBooks}
                    viewedFrom={stack}
                    bookId={bookId}
                  />
                </div>
              );
            })}
          </div>
          <img
            className='img-button'
            id='new-stack'
            onClick={() => setAddBookOpen((prev) => !prev)}
            src={plusCircle}
          />
        </div>
        <AddBookMenu isOpen={addBookOpen} stack={stack} />
      </>
    )
  );
}
