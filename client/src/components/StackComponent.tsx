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
      <div className='stack-header'>
        <h2>{stack.title}</h2>
        <button>View Stack</button>
      </div>
      {books.length > 0 && (
        <div className='grid'>
          <div className='book-container grid'>
            <img
              className='large-cover-img'
              alt={`The cover of ${books[index].title}`}
            />
            <div className='book-info'>
              <h3>{books[index].title}</h3>
              <h4>by {books[index].author}</h4>
              <div className='description'>
                <h5>Description:</h5>
                <p>
                  {books[index].description != null &&
                  books[index].description!.length > 50
                    ? `${books[index].description?.substring(0, 47)}...`
                    : books[index].description}
                </p>
              </div>
            </div>
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
