import { FormEvent, useState } from 'react';
import RadioButtonField from './RadioButtonField';
import TextField from './TextField';
import { FormField } from '../../utils/types';
import TextareaField from './TextareaFeild';
import NumberField from './NumberField';

type GenericFormProps = {
  formTitle: string;
  formFields: FormField[];
  onFormSubmit: (values: Record<string, number | string>) => void;
  initialValues: Record<string, number | string>;
  submitText: string;
  formName: string;
};

export default function GenericForm({
  formFields,
  formTitle,
  onFormSubmit,
  initialValues,
  submitText,
  formName,
}: GenericFormProps) {
  const [formVals, setFormVals] = useState(initialValues);

  function onFormChange(
    event: FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    let key: string = event.currentTarget.id;
    let value: string | number = event.currentTarget.value;
    if (event.currentTarget.type === 'radio') key = event.currentTarget.name;
    if (event.currentTarget.type === 'number') value = Number(value);

    setFormVals({ ...formVals, [key]: value });
  }

  let fieldId = -1;
  return (
    <div className={formName}>
      <h2>{formTitle}</h2>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          onFormSubmit(formVals);
        }}
      >
        {formFields.map((field) => {
          fieldId++;
          switch (field.type) {
            case 'radio':
              return (
                <RadioButtonField
                  props={{ ...field, formName, formVals, onFormChange }}
                  key={fieldId}
                />
              );
            case 'textarea':
              return (
                <TextareaField
                  props={{ ...field, formName, formVals, onFormChange }}
                  key={fieldId}
                />
              );
            case 'number':
              return (
                <NumberField
                  props={{ ...field, formName, formVals, onFormChange }}
                  key={fieldId}
                />
              );
            default:
              return (
                <TextField
                  props={{ ...field, formName, formVals, onFormChange }}
                  key={fieldId}
                />
              );
          }
        })}
        <button className={`${formName}__submit`} type='submit'>
          {submitText}
        </button>
      </form>
    </div>
  );
}
