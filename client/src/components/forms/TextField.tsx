import { FormEvent } from 'react';

export type TextFieldProps = {
  formVals: { [key: string]: string | number };
  onFormChange: (
    event: FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  id: string;
  placeholder: string;
  required: boolean;
  textarea: boolean;
  label: string;
};

export default function TextField({
  formVals,
  onFormChange,
  id,
  placeholder,
  required,
  label,
  textarea,
}: TextFieldProps) {
  return (
    <div className='field'>
      <label htmlFor={id}>{label}</label>
      {textarea ? (
        <textarea
          value={formVals[id]}
          onChange={onFormChange}
          id={id}
          placeholder={placeholder}
          required={required}
        />
      ) : (
        <input
          value={formVals[id]}
          onChange={onFormChange}
          type='text'
          id={id}
          placeholder={placeholder}
          required={required}
        />
      )}
    </div>
  );
}
