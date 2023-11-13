import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Book, Stack } from '../../utils/types';
import BookPreview from '../BookPreview/BookPreview';
import { getBooksInStack } from '../../services/APIClient';

import './StackView.css';

import plusCircle from '../../assets/plus-circle.svg';
import AddBookMenu from '../AddBookMenu/AddBookMenu';

export default function StackView() {
  const location = useLocation();

  const { stack } = location.state as { stack: Stack };
  const [books, setBooks] = useState<Book[]>([]);
  const [addBookOpen, setAddBookOpen] = useState(false)

  useEffect(() => {
    getBooks();
  }, [stack.id]);

  async function getBooks() {
    const newBooks = await getBooksInStack(stack.id);
    setBooks(newBooks);
  }

  

  return (
    <>
      <div className='stack-view-container'>
        <h2>{stack.name}</h2>
        <div className='book-list'>
          {books.map((book) => {
            return (
              <div key={book.id} className='book-list-item'>
                <BookPreview
                  resetStack={getBooks}
                  viewedFrom={stack}
                  book={book}
                />
              </div>
            );
          })}
        </div>
        <img
          className='img-button'
          id='new-stack'
          onClick={() => setAddBookOpen(prev => !prev)}
          src={plusCircle}
        />
      </div>
      <AddBookMenu books={books} isOpen={addBookOpen} stack={stack}/>
    </>
  );
}
