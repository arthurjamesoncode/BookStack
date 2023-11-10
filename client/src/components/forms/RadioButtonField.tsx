import { FormEvent } from 'react';

export type RadioButtonFieldProps = {
  formVals: { [key: string]: string | number };
  onFormChange: (event: FormEvent<HTMLInputElement>) => void;
  group: string;
  options: { value: string; label: string }[];
  groupLabel: string;
};

export default function RadioButtonField({
  formVals,
  onFormChange,
  group,
  options,
  groupLabel,
}: RadioButtonFieldProps) {
  let radioId = -1;
  return (
    <div className='field'>
      <label>{groupLabel}</label>
      <div className='radio-group'>
        {options.map((option) => {
          radioId++
          return (
            <div key={radioId} className='radio-button'>
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
