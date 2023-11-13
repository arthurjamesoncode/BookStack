import { useLocation, useNavigate } from 'react-router-dom';

import { addNewBookToStack, editBook } from '../../services/APIClient';
import { Book } from '../../utils/types';

import { BookFormFields } from '../../utils/formFields';
import GenericForm from '../genericForms/GenericForm';

import './BookForm.css';

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

  console.log(location.state)
  const { stack, book, edit, hasImg} = location.state as {
    stack: { name: string; id: number };
    book: Record<string, string | number>;
    edit: boolean;
    hasImg: boolean | undefined
  };

  const initialFormVals = book || blankForm;

  function submitBook(values: Record<string, number | string>) {
    const book = values as unknown as Book; //guaranteed to have all necessary fields for adding a new book
    book.hasImg = hasImg || false

    if (!edit) addNewBookToStack(stack.id, 'current', book);
    else editBook(book);

    navigate('/');
  }

  const fields = BookFormFields;

  const title = edit ? 'Edit Book' : `Add New Book To ${stack.name}`;
  const submitText = edit ? 'Edit Book' : `Add Book`;

  return (
    <GenericForm
      formName='book-form'
      formFields={fields}
      formTitle={title}
      submitText={submitText}
      onFormSubmit={submitBook}
      initialValues={initialFormVals}
    />
  );
}
