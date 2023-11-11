import { FormEvent } from 'react';

export type TextFieldProps = {
  formName: string
  formVals: Record<string, string | number>;
  onFormChange: (
    event: FormEvent<HTMLInputElement>
  ) => void;
  id: string;
  placeholder: string;
  required: boolean;
  label: string;
};

export default function TextField({
  formName,
  formVals,
  onFormChange,
  id,
  placeholder,
  required,
  label,
}: TextFieldProps) {
  return (
    <div className={`${formName}__field`}>
      <label htmlFor={id}>{label}</label>
      <input
        className={`${formName}__text-input`}
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
