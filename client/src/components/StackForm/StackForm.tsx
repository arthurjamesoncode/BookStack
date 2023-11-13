import { StackFormFields } from '../../utils/formFields';
import GenericForm from '../genericForms/GenericForm';

import './StackForm.css';

type StackFormProps = {
  hidden: boolean;
  hideStackForm: () => void;
  addOrEditStack: (name: string) => void;
  edit: boolean;
};

export default function StackForm({
  hidden,
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
    <div className={`stack-prompt ${hidden ? 'hidden' : ''}`}>
      <button onClick={() => hideStackForm()}>Exit</button>
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
