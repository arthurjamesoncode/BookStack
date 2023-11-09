import { useEffect, useState } from 'react';
import { Book, Stack } from '../types';
import { getBooksInStack } from '../services/APIClient';

import { useNavigate } from 'react-router-dom';

import '../styles/StackComponent.css';
import BookPreview from './BookPreview';

type StackComponentProps = {
  stack: Stack;
};

export default function StackPreview({ stack }: StackComponentProps) {
  const [books, setBooks] = useState([] as Book[]);
  const [index, setIndex] = useState(0);

  const navigate = useNavigate();

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
        <button
          onClick={() =>
            navigate(`/view/stack`, { state: { stack, books } })
          }
        >
          View Stack
        </button>
      </div>
      <div className='grid'>
        {books.length > 0 && <BookPreview book={books[index]} />}
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
          <button onClick={() => navigate(`/stacks/${stack.id}/add`)}>
            Add Book
          </button>
        </div>
      </div>
    </div>
  );
}
