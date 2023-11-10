import { useLocation, useNavigate } from 'react-router-dom';

import { addNewBookToStack, editBook } from '../../services/APIClient';
import { Book, Stack } from '../../types';

import { BookFormFields } from './formFieldProps';
import GenericForm from './GenericForm';

import '../../styles/BookForm.css';

const blankForm = {
  title: '',
    author: '',
    totalPages: 0,
    bookType: 'paper',
    publisher: '',
    ISBN: '',
    OLID: '',
    description: '',
  } as { [key: string]: number | string }

export default function BookForm() {
  const location = useLocation();
  const navigate = useNavigate();

  const { stack, book } = location.state as {
    stack: Stack;
    book: { [key: string]: number | string };
  };

  let initialFormVals = book || blankForm
  const edit = book != null;

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
