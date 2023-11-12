type MenuProps = {
  menuName: string;
  isOpen: boolean;
  options: { text: string; onClick: Function }[];
  state?: Record<string, any>
};

export default function Menu({ menuName, isOpen, options, state }: MenuProps) {
  return (
    <ul className={`${menuName} ${isOpen ? 'open' : ''}`}>
      {options.map((option) => {
        return <li className={`${menuName}__option`} onClick={() => option.onClick(state)}>{option.text}</li>;
      })}
    </ul>
  );
}
