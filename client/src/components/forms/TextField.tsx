import { FormEvent } from 'react';

export type TextFieldProps = {
  formVals: { [key: string]: string | number };
  onFormChange: (
    event: FormEvent<HTMLInputElement>
  ) => void;
  id: string;
  placeholder: string;
  required: boolean;
  label: string;
};

export default function TextField({
  formVals,
  onFormChange,
  id,
  placeholder,
  required,
  label,
}: TextFieldProps) {
  return (
    <div className='field'>
      <label htmlFor={id}>{label}</label>
      <input
        value={formVals[id]}
        onChange={onFormChange}
        type='text'
        id={id}
        placeholder={placeholder}
        required={required}
      />
    </div>
  );
}
