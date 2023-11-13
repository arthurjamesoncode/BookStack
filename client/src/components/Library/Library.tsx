import { getBooksInStack, getUserBooks } from '../../services/APIClient';
import { Book } from '../../utils/types';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import BookCard from './BookCard';

export default function Library() {
  const location = useLocation();
  const { stack } = location.state;

  const [books, setBooks] = useState<Book[]>([]);

  async function reset() {
    const allBooks: Book[] = await getUserBooks(1);
    const stackBooks: Book[] = await getBooksInStack(stack.id);
    const stackBookIds: number[] = stackBooks.map((book) => book.id);

    setBooks(allBooks.filter((book) => !stackBookIds.includes(book.id)));
  }

  useEffect(() => {
    reset();
  }, []);

  return (
    <div>
      {books.length > 0 ? (
        books.map((book) => {
          return (
            <BookCard
              key={book.id}
              book={book}
              stack={stack}
            />
          );
        })
      ) : (
        <h3>
          There are no books in your library that are not already in this stack.
        </h3>
      )}
    </div>
  );
}
