import { StackFormFields } from '../../../utils/formFields';
import GenericForm from '../genericForms/GenericForm';

import './StackForm.css';

import xCircle from '/assets/x-circle.svg'

type StackFormProps = {
  open: boolean;
  hideStackForm: () => void;
  addOrEditStack: (name: string) => void;
  edit: boolean;
};

export default function StackForm({
  open,
  hideStackForm,
  addOrEditStack,
  edit
}: StackFormProps) {
  const fields = StackFormFields;

  const initialValues = {
    name: '',
  };

  function onFormSubmit(values: Record<string, string | number>) {
    const { name } = values as {name : string};

    addOrEditStack(name);
    hideStackForm();
  }

  return (
    <div className={`bottom-form-menu ${open ? 'open' : ''}`}>
      <img src={xCircle} onClick={() => hideStackForm()} />
      <h2>{edit ? 'Edit Stack' : 'Add a new stack:'} </h2>
      <GenericForm
        formFields={fields}
        formName='add-stack-form'
        onFormSubmit={onFormSubmit}
        submitText={edit ? 'Edit Stack' : 'Add Stack'}
        initialValues={initialValues}
      />
    </div>
  );
}
