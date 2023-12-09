import { useEffect, useState } from 'react';
import { Book, Stack } from '../../utils/types';
import { getBooksInStack } from '../../services/APIClient';
import BookPreview from '../BookPreview/BookPreview';

import './StackPreview.css';

import menuDots from '/assets/menu-dots.svg';
import plusCircle from '/assets/plus-circle.svg';
import leftArrow from '/assets/arrow-left.svg';
import rightArrow from '/assets/arrow-right.svg';

type StackComponentProps = {
  stack: Stack;
  openStackMenu: () => void;
  openAddBookMenu: (stack: Stack) => void;
};

export default function StackPreview({
  stack,
  openStackMenu,
  openAddBookMenu,
}: StackComponentProps) {
  const [books, setBooks] = useState<Book[]>([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    getBooks();
  }, [stack.id]);

  function changeIndex(diff: number) {
    setIndex(index + diff);
  }

  async function getBooks() {
    const newBooks = await getBooksInStack(stack.id);
    setBooks(newBooks);
  }

  return (
    <div className='container stack-container'>
      <div className='stack-header'>
        <h2>{stack.name}</h2>
        <img
          className='menu-dots'
          onClick={() => openStackMenu()}
          src={menuDots}
        />
      </div>
      <div className='grid'>
        {books.length > 0 ? (
          <BookPreview
            resetStack={getBooks}
            viewedFrom={stack}
            book={books[index]}
          />
        ) : (
          <div className='book-container'>
            <div className='empty-message'>
              <h3>You don't have any books in this stack. </h3>
              <h3>Add one now!</h3>
            </div>
          </div>
        )}
        <div className='stack-buttons'>
          <div className='movement-buttons'>
            <img
              className='img-button'
              onClick={() => {
                if (index !== 0) changeIndex(-1);
              }}
              src={leftArrow}
            />
            <img
              className='img-button'
              onClick={() => {
                if (index < books.length - 1) changeIndex(1);
              }}
              src={rightArrow}
            />
          </div>
          <img
            className='img-button'
            onClick={() => openAddBookMenu(stack)}
            src={plusCircle}
          />
        </div>
      </div>
    </div>
  );
}
