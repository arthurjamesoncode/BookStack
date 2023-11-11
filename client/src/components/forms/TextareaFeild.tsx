import { FormEvent } from 'react';

type TextFieldProps = {
  formName: string;
  formVals: Record<string, string | number>;
  onFormChange: (event: FormEvent<HTMLTextAreaElement>) => void;
  id: string;
  placeholder: string;
  required: boolean;
  label: string;
};

export default function TextareaField({
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
      <textarea
        className={`${formName}__text-area`}
        value={formVals[id]}
        onChange={onFormChange}
        id={id}
        placeholder={placeholder}
        required={required}
      />
    </div>
  );
}
