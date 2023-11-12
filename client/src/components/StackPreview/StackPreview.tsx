import { useEffect, useState } from 'react';
import { Book, Stack } from '../../utils/types';
import { getBooksInStack } from '../../services/APIClient';
import BookPreview from '../BookPreview/BookPreview';

import menuDots from '../../assets/menu-dots.svg';
import './StackPreview.css';

type StackComponentProps = {
  stack: Stack;
  openStackMenu: Function;
  openAddBookMenu: Function;
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
    const newBooks = await getBooksInStack(stack.id)
    setBooks(newBooks)
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
        {books.length > 0 && (
          <BookPreview getBooks={getBooks} viewedFrom={stack} book={books[index]} />
        )}
        <div className='stack-buttons'>
          <div className='movement-buttons'>
            <button disabled={index === 0} onClick={() => changeIndex(-1)}>
              {'<-'}
            </button>
            <button
              disabled={index === books.length - 1}
              onClick={() => changeIndex(1)}
            >
              {'->'}
            </button>
          </div>
          <div className='stack-buttons'>
            <button onClick={() => openAddBookMenu(stack)}>Add Book</button>
          </div>
        </div>
      </div>
    </div>
  );
}
