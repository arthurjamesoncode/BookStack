import { FormEvent } from "react";

type TextFieldProps = {
  formVals: { [key: string]: string | number };
  onFormChange: (
    event: FormEvent<HTMLTextAreaElement>
  ) => void;
  id: string;
  placeholder: string;
  required: boolean;
  label: string;
};

export default function TextareaField({
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
      <textarea
        value={formVals[id]}
        onChange={onFormChange}
        id={id}
        placeholder={placeholder}
        required={required}
      />
    </div>
  );
}
