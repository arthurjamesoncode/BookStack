import { FormEvent } from 'react';

export type TextFieldProps = {
  formName: string;
  formVals: Record<string, string | number>;
  onFormChange: (event: FormEvent<HTMLInputElement>) => void;
  id: string;
  placeholder: string;
  required: boolean;
  label: string;
  maxlength: number
};

export default function TextField({ props }: { props: TextFieldProps }) {
  return (
    <div className={`${props.formName}__field`}>
      <label htmlFor={props.id}>{props.label}</label>
      <input
        className={`${props.formName}__text-input`}
        value={props.formVals[props.id]}
        onChange={props.onFormChange}
        type='text'
        id={props.id}
        placeholder={props.placeholder}
        required={props.required}
        maxLength={props.maxlength}
      />
    </div>
  );
}
