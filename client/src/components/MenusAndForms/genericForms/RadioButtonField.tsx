import { FormEvent } from 'react';

export type RadioButtonFieldProps = {
  formVals: Record<string, number | string>;
  onFormChange: (event: FormEvent<HTMLInputElement>) => void;
  group: string;
  options: { value: string; label: string }[];
  label: string;
  formName: string;
};

export default function RadioButtonField({
  props,
}: {
  props: RadioButtonFieldProps;
}) {
  let radioId = -1;
  return (
    <div className={`${props.formName}__field`}>
      <label>{props.label}</label>
      <div className={`${props.formName}__radio-group`}>
        {props.options.map((option) => {
          radioId++;
          return (
            <div key={radioId} className={`${props.formName}__radio-button`}>
              <label htmlFor={option.value}>{option.label}</label>
              <input
                checked={props.formVals[props.group] === option.value}
                onChange={props.onFormChange}
                type='radio'
                id={option.value}
                value={option.value}
                name={props.group}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
