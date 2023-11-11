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
          console.log(field);
          fieldId++;
          if (field.type === 'radio') {
            return (
              <RadioButtonField
                formName={formName}
                formVals={formVals}
                onFormChange={onFormChange}
                group={field.group!}
                options={field.options!}
                groupLabel={field.label!}
                key={fieldId}
              />
            );
          } else if (field.type === 'textarea') {
            return (
              <TextareaField
                formName={formName}
                formVals={formVals}
                onFormChange={onFormChange}
                id={field.id!}
                placeholder={field.placeholder!}
                required={field.required!}
                label={field.label}
                key={fieldId}
              />
            );
          } else if (field.type === 'number') {
            return (
              <NumberField
                formName={formName}
                formVals={formVals}
                onFormChange={onFormChange}
                id={field.id!}
                min={field.min!}
                required={field.required!}
                label={field.label}
                key={fieldId}
              />
            );
          }
          return (
            <TextField
              formName={formName}
              formVals={formVals}
              onFormChange={onFormChange}
              id={field.id!}
              placeholder={field.placeholder!}
              required={field.required!}
              label={field.label}
              key={fieldId}
            />
          );
        })}
        <button className={`${formName}__submit`} type='submit'>
          {submitText}
        </button>
      </form>
    </div>
  );
}
