import { getCoverUrl } from '../../services/OpenLibrary';

import defaultIcon from '/assets/default-book-icon.png';
import plusCircle from '/assets/plus-circle.svg';
import { addExistingBookToStack } from '../../services/APIClient';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store';
import { addBookToStack } from '../../store/slices/stackSlice';

type BookCardProps = {
  bookId: number;
};

export default function BookCard(props: BookCardProps) {
  const { bookId } = props;
  const navigate = useNavigate();

  const dispatch = useAppDispatch()
  const stack = useAppSelector(state => state.stack.currentStack);
  const book = useAppSelector(state => state.book.books[bookId]);

  if(!stack) navigate('/');

  async function addToStack() {
    await addExistingBookToStack(book.id, stack!.type, stack!.id);

    dispatch(addBookToStack({ stackId: stack!.id, bookId }))
    navigate('/');
  }

  let imgUrl = defaultIcon;
  if (book.hasImg) {
    imgUrl = getCoverUrl('olid', book.OLID) + '-L.jpg';
  }

  return (
    <div className='book-container grid'>
      <img
        className='large-cover-img'
        src={imgUrl}
        alt={`The cover of ${book.title}`}
      />
      <div className='book-info'>
        <h3>{book.title}</h3>
        <h4>by {book.author}</h4>
        <div className='description'>
          <h5>Description:</h5>
          <p>
            {book.description != null && book.description!.length > 50
              ? `${book.description?.substring(0, 47)}...`
              : book.description}
          </p>
        </div>
      </div>
      <img className='img-button' src={plusCircle} onClick={addToStack} />
    </div>
  );
}
