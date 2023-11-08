import { useEffect, useState } from 'react';
import { Book, Stack } from '../types';
import { getBooksInStack } from '../services/APIClient';

import '../styles/StackComponent.css';
import BookPreview from './BookPreview';

type StackComponentProps = {
  stack: Stack;
};

export default function StackComponent({ stack }: StackComponentProps) {
  const [books, setBooks] = useState([] as Book[]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    getBooksInStack(stack.id).then((result) => setBooks(result));
  }, []);

  function changeIndex(diff: number) {
    setIndex(index + diff);
  }

  return (
    <div className='container stack-container'>
      <div className='stack-header'>
        <h2>{stack.title}</h2>
        <button>View Stack</button>
      </div>
      {books.length > 0 && (
        <div className='grid'>
          <BookPreview book={books[index]} />
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
        </div>
      )}
    </div>
  );
}