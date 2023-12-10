import { useState } from 'react';
import { editBook } from '../../../services/APIClient';
import { PageFormFields } from '../../../utils/formFields';
import GenericForm from '../genericForms/GenericForm';

import './AddReadingSession.css';
import { Book } from '../../../utils/types';

type ChangePageFormProps = {
  refresh: () => void;
  isOpen: boolean;
  hidePrompt: () => void;
  book: Book;
  finishReading: () => void;
  startReading: () => void;
};

export default function ChangePageForm(props: ChangePageFormProps) {
  const { refresh, isOpen, hidePrompt, book, finishReading, startReading } =
    props;
  
  const [pagesSelected, setPagesSelected] = useState(0);

  const initialValues: Record<string, string | number> = {
    pages: 0,
  };

  const fields = PageFormFields;
  if (fields[0].type == 'range')
    fields[0].max = book.totalPages - book.currentPage;

  async function onFormSubmit(values: Record<string, string | number>) {
    const { pages } = values as { pages: number };

    if (book.currentPage + pages === book.totalPages) finishReading();
    else if (book.primaryStack != 'current') startReading();

    await editBook({ id: book.id, currentPage: book.currentPage + pages });
    hidePrompt();
    refresh();
  }

  function onFormChange(key: string, value: string | number) {
    if (key === 'pages') setPagesSelected(value as number);
  }

  return (
    <div className={`bottom-form-menu ${isOpen ? 'open' : ''}`}>
      <h3>You have read {pagesSelected} pages?</h3>
      <GenericForm
        formName='reading-session-form'
        submitText='Add reading session'
        initialValues={initialValues}
        formFields={fields}
        onFormSubmit={onFormSubmit}
        dynamicOnChange={onFormChange}
      />
    </div>
  );
}
