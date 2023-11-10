import { useLocation, useNavigate } from 'react-router-dom';

import { addNewBookToStack, editBook } from '../services/APIClient';
import { Book } from '../types';

import { BookFormFields } from './forms/formFieldProps';
import GenericForm from './forms/GenericForm';

import '../styles/BookForm.css';

const blankForm = {
  title: '',
  author: '',
  totalPages: 0,
  bookType: 'paper',
  publisher: '',
  ISBN: '',
  OLID: '',
  description: '',
} as { [key: string]: number | string };

export default function BookForm() {
  const location = useLocation();
  const navigate = useNavigate();

  const { stack, book, edit } = location.state as {
    stack: { title: string; id: number };
    book: { [key: string]: number | string };
    edit: boolean;
  };

  let initialFormVals = book || blankForm;

  function submitBook(values: { [key: string]: string | number }) {
    const book = values as unknown as Book;

    if (!edit) addNewBookToStack(stack.id, 'current', book);
    else editBook(book);

    navigate(-1);
  }

  const fields = BookFormFields;

  const title = edit ? 'Edit Book' : `Add New Book To ${stack.title}`;
  const submitText = edit ? 'Edit Book' : `Add Book`;

  return (
    <GenericForm
      formFields={fields}
      formTitle={title}
      submitText={submitText}
      onFormSubmit={submitBook}
      initialValues={initialFormVals}
    />
  );
}
