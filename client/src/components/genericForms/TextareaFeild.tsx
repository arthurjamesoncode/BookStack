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

export default function TextareaField({props}: {props: TextFieldProps}) {
  return (
    <div className={`${props.formName}__field`}>
      <label htmlFor={props.id}>{props.label}</label>
      <textarea
        className={`${props.formName}__textarea`}
        value={props.formVals[props.id]}
        onChange={props.onFormChange}
        id={props.id}
        placeholder={props.placeholder}
        required={props.required}
      />
    </div>
  );
}
