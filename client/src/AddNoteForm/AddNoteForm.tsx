import GenericForm from '../components/genericForms/GenericForm';
import { addNoteToBook } from '../services/APIClient';
import { NoteFormFields } from '../utils/formFields';
import { Book } from '../utils/types';

import './AddNoteForm.css'

type AddNoteFormProps = {
  isOpen: boolean;
  closeMenu: () => void;
  refresh: () => void;
  book : Book
};

export default function AddNoteForm({ isOpen, closeMenu, book, refresh }: AddNoteFormProps) {
  const initialValues: Record<string, string | number> = {
    text: '',
  };

  const fields = NoteFormFields;

  async function onSubmit(values : Record<string, string | number>) {
    const {text} = values as {text: string}
    await addNoteToBook(book.id, {text})
    refresh();
    closeMenu();
  }

  return (
    <div className={`bottom-form-menu ${isOpen ? 'open' : ''}`}>
      <button onClick={closeMenu}>Exit</button>
      <h3>Add a note for {book.title} at page {book.currentPage}</h3>
      <GenericForm
        formFields={fields}
        formName='add-note-form'
        onFormSubmit={onSubmit}
        initialValues={initialValues}
        submitText='Add note'
      />
    </div>
  );
}
