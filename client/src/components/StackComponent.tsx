import { useEffect, useState } from 'react';
import { Book, Stack } from '../types';
import { getBooksInStack } from '../services/APIClient';

import '../styles/StackComponent.css';

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
      <h2>{stack.title}</h2>
      {books.length > 0 && (
        <div className='container'>
          <div className='book-container'>
          <img className='large-cover-img' alt={`The cover of ${books[index].title}`}/>
          <h3>{books[index].title}</h3>
          </div>
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
