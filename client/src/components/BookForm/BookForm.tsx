import { useLocation, useNavigate } from 'react-router-dom';

import { addNewBookToStack, editBook } from '../../services/APIClient';
import { Book } from '../../utils/types';

import { BookFormFields } from '../../utils/formFields';
import GenericForm from '../MenusAndForms/genericForms/GenericForm';

import './BookForm.css';
import { useAppDispatch, useAppSelector } from '../../store';
import { addNewBookToStack as addNewBookAction} from '../../store/slices/stackSlice'
import { addBook, editBook as editBookAction } from '../../store/slices/bookSlice';

const blankForm: Record<string, number | string> = {
  title: '',
  author: '',
  totalPages: 0,
  bookType: 'paper',
  publisher: '',
  ISBN: '',
  OLID: '',
  description: '',
};

export default function BookForm() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { book, edit, hasImg } = location.state as {
    book: Record<string, string | number>;
    edit: boolean;
    hasImg: boolean | undefined;
  };

  const stack = useAppSelector((state) => state.stack.currentStack);
  if (!stack) {
    navigate('/');
    return <></>;
  }

  const initialFormVals = book || blankForm;

  async function submitBook(values: Record<string, number | string>) {
    const book = values as unknown as Book; //guaranteed to have all necessary fields for adding a new book
    if (!book.hasImg) book.hasImg = hasImg || false;

    if (!edit) {
      const newBook = await addNewBookToStack(stack!.id, stack!.type, book);
      dispatch(addBook(newBook));
      dispatch(addNewBookAction({bookId: newBook.id, stack: stack!}))
    } else {
      await editBook(book);
      dispatch(editBookAction(book))
    }

    navigate('/');
  }

  const fields = BookFormFields;

  const title = edit ? 'Edit Book' : `Add New Book To ${stack!.name}`;
  const submitText = edit ? 'Edit Book' : `Add Book`;

  return (
    <div className='book-form-container'>
      <h2>{title}</h2>
      <GenericForm
        formName='book-form'
        formFields={fields}
        submitText={submitText}
        onFormSubmit={submitBook}
        initialValues={initialFormVals}
      />
    </div>
  );
}
