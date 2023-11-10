import { FormEvent, useState } from 'react';
import RadioButtonField from './RadioButtonField';
import TextField from './TextField';
import { FormField } from '../../types';

type GenericFormProps = {
  formTitle: string;
  formFields: FormField[];
  onFormSubmit: (values: { [key: string]: number | string }) => void;
  initialValues: { [key: string]: number | string };
  submitText: string;
};

export default function GenericForm({
  formFields,
  formTitle,
  onFormSubmit,
  initialValues,
  submitText,
}: GenericFormProps) {
  const [formVals, setFormVals] = useState(initialValues);

  function onFormChange(
    event: FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    let key: string = event.currentTarget.id;
    let value: string | number = event.currentTarget.value;
    if (event.currentTarget.type === 'radio') key = 'bookType';
    if (event.currentTarget.type === 'number') value = Number(value);

    setFormVals({ ...formVals, [key]: value });
  }

  let fieldId = -1;
  return (
    <div className='form-container'>
      <h2>{formTitle}</h2>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          onFormSubmit(formVals);
        }}
      >
        {formFields.map((field) => {
          fieldId++;
          if (field.type === 'radio') {
            return (
              <RadioButtonField
                formVals={formVals}
                onFormChange={onFormChange}
                group={field.group!}
                options={field.options!}
                groupLabel={field.label!}
                key={fieldId}
              />
            );
          }
          return (
            <TextField
              formVals={formVals}
              onFormChange={onFormChange}
              id={field.id!}
              placeholder={field.placeholder!}
              textarea={field.type === 'textarea'}
              required={field.required!}
              label={field.label}
              key={fieldId}
            />
          );
        })}

        <button type='submit'>{submitText}</button>
      </form>
    </div>
  );
}
