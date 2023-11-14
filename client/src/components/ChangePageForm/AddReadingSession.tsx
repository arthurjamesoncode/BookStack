import { useState } from 'react';
import { editBook } from '../../services/APIClient';
import { PageFormFields } from '../../utils/formFields';
import GenericForm from '../genericForms/GenericForm';

import './AddReadingSession.css';

type ChangePageFormProps = {
  currentPages: number;
  bookId: number;
  refresh: () => void;
  isOpen: boolean;
  hidePrompt: () => void;
  max: number;
};

export default function ChangePageForm({
  currentPages,
  bookId,
  refresh,
  isOpen: isHidden,
  hidePrompt,
  max,
}: ChangePageFormProps) {
  const [pagesSelected, setPagesSelected] = useState(0);

  const initialValues: Record<string, string | number> = {
    pages: 0,
  };

  const fields = PageFormFields;
  if (fields[0].type == 'range') fields[0].max = max;

  async function onFormSubmit(values: Record<string, string | number>) {
    const { pages } = values as { pages: number };

    await editBook({ id: bookId, currentPage: currentPages + pages });
    hidePrompt();
    refresh();
  }

  function onFormChange(key: string, value: string | number) {

    if (key === 'pages') setPagesSelected(value as number)
  };

  return (
    <div className={`reading-session-menu ${isHidden ? 'open' : ''}`}>
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
