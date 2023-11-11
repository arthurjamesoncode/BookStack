import { FormEvent } from 'react';

export type NumberFieldProps = {
  formName: string;
  formVals: Record<string, string | number>;
  onFormChange: (event: FormEvent<HTMLInputElement>) => void;
  id: string;
  min: number;
  required: boolean;
  label: string;
};

export default function NumberField({
  formName,
  formVals,
  onFormChange,
  id,
  min,
  required,
  label,
}: NumberFieldProps) {
  return (
    <div className={`${formName}__field`}>
      <label htmlFor={id}>{label}</label>
      <input
        className={`${formName}__number-input`}
        value={formVals[id]}
        onChange={onFormChange}
        type='number'
        id={id}
        min={min}
        required={required}
      />
    </div>
  );
}
