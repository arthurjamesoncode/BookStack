import { FormEvent, useState } from 'react';
import RadioButtonField from './RadioButtonField';
import TextField from './TextField';
import { FormField } from '../../../utils/types';
import TextareaField from './TextareaFeild';
import NumberField from './NumberField';

type GenericFormProps = {
  formFields: FormField[];
  onFormSubmit: (values: Record<string, number | string>) => void;
  initialValues: Record<string, number | string>;
  submitText: string;
  formName: string;
  dynamicOnChange?: (key: string, value: string | number) => void;
};

export default function GenericForm({
  formFields,
  onFormSubmit,
  initialValues,
  submitText,
  formName,
  dynamicOnChange
}: GenericFormProps) {
  const [formVals, setFormVals] = useState(initialValues);

  function onFormChange(
    event: FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    let key: string = event.currentTarget.id;
    let value: string | number = event.currentTarget.value;
    if (event.currentTarget.type === 'radio') key = event.currentTarget.name;

    if (
      event.currentTarget.type === 'number' ||
      event.currentTarget.type === 'range'
    ) {
      value = Number(value);
    }

    setFormVals({ ...formVals, [key]: value });
    if(dynamicOnChange) dynamicOnChange(key, value)
  }

  let fieldId = -1;
  return (
    <form
      className={formName}
      onSubmit={(event) => {
        event.preventDefault();
        onFormSubmit(formVals);
        setFormVals(initialValues);
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
          case 'text':
            const maxlength = field.maxlength || Infinity;
            return (
              <TextField
                props={{
                  ...field,
                  formName,
                  formVals,
                  onFormChange,
                  maxlength,
                }}
                key={fieldId}
              />
            );
          default:
            const max = field.max || Infinity;
            return (
              <NumberField
                props={{ ...field, formName, formVals, onFormChange, max }}
                key={fieldId}
              />
            );
        }
      })}
      <button className={`${formName}__submit`} type='submit'>
        {submitText}
      </button>
    </form>
  );
}
