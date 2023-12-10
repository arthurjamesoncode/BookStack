import BookCard from './BookCard';
import { useAppSelector } from '../../store';
import { useNavigate } from 'react-router-dom';

export default function Library() {
  const navigate = useNavigate();

  const stack = useAppSelector((state) => state.stack.currentStack!);
  const allBookIds = useAppSelector((state) => Object.keys(state.book.books));
  const booksInStack = useAppSelector((state) => state.stack.booksInStacks[stack.id]);
  const bookIds = allBookIds.filter((id) => !booksInStack.includes(parseInt(id)));
  
  if(!stack) {
    navigate('/')
    return <></>
  }
  return (
    <div>
      {bookIds.length > 0 ? (
        bookIds.map((id, index) => {
          return (
            <BookCard
              key={index}
              bookId={parseInt(id)}
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
