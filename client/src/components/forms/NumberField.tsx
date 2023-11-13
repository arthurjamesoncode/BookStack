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
  props
}: {props : NumberFieldProps}) {
  return (
    <div className={`${props.formName}__field`}>
      <label htmlFor={props.id}>{props.label}</label>
      <input
        className={`${props.formName}__number-input`}
        value={props.formVals[props.id]}
        onChange={props.onFormChange}
        type='number'
        id={props.id}
        min={props.min}
        required={props.required}
      />
    </div>
  );
}
