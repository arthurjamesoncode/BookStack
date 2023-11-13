
import './menu.css'

type MenuProps = {
  menuType: string;
  isOpen: boolean;
  options: { text: string; onClick: Function }[];
  state?: Record<string, any>
};

export default function Menu({ menuType, isOpen, options, state }: MenuProps) {
  let optionId = -1
  return (
    <ul className={`${menuType} ${isOpen ? 'open' : ''}`}>
      {options.map((option) => {
        optionId++
        return <li className={`${menuType}__option`} key={optionId} onClick={() => option.onClick(state)}>{option.text}</li>;
      })}
    </ul>
  );
}
