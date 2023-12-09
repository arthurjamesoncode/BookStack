import './menu.css';

type MenuProps = {
  menuType: string;
  isOpen: boolean;
  options: { text: string; onClick: () => void }[];
};

export default function Menu({ menuType, isOpen, options}: MenuProps) {
  let optionId = -1;
  return (
    <ul className={`${menuType} ${isOpen ? 'open' : ''}`}>
      {options.map((option) => {
        optionId++;
        return (
          <li
            className={`${menuType}__option`}
            key={optionId}
            onClick={option.onClick}
          >
            {option.text}
          </li>
        );
      })}
    </ul>
  );
}
