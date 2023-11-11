import { FormEvent } from 'react';

export type RadioButtonFieldProps = {
  formVals: Record<string, number | string>;
  onFormChange: (event: FormEvent<HTMLInputElement>) => void;
  group: string;
  options: { value: string; label: string }[];
  groupLabel: string;
  formName: string
};

export default function RadioButtonField({
  formName,
  formVals,
  onFormChange,
  group,
  options,
  groupLabel,
}: RadioButtonFieldProps) {
  let radioId = -1;
  return (
    <div className={`${formName}__field`}>
      <label>{groupLabel}</label>
      <div className={`${formName}__radio-group`}>
        {options.map((option) => {
          radioId++
          return (
            <div key={radioId} className={`${formName}__radio-button`}>
              <label htmlFor={option.value}>{option.label}</label>
              <input
                checked={formVals[group] === option.value}
                onChange={onFormChange}
                type='radio'
                id={option.value}
                value={option.value}
                name={group}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
