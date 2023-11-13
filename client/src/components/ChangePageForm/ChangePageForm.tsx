import { editBook } from '../../services/APIClient';
import { PageFormFields } from '../../utils/formFields';
import GenericForm from '../genericForms/GenericForm';

import './ChangePageForm.css';

type ChangePageFormProps = {
  currentPages: number;
  bookId: number;
  refresh: () => void;
  isHidden: boolean;
  hidePrompt: () => void;
};

export default function ChangePageForm({
  currentPages,
  bookId,
  refresh,
  isHidden
}: ChangePageFormProps) {
  const initialValues: Record<string, string | number> = {
    pages: 0,
  };

  const fields = PageFormFields;

  async function onFormSubmit(values: Record<string, string | number>) {
    const { pages } = values as { pages: number };

    await editBook({ id: bookId, currentPage: currentPages + pages });

    refresh();
  }

  return (
    <div className={`change-page-prompt ${isHidden ? 'hidden' : ''}`}>
      <GenericForm
        formName='page-change-form'
        submitText='Add reading session'
        initialValues={initialValues}
        formFields={fields}
        onFormSubmit={onFormSubmit}
      />
    </div>
  );
}
