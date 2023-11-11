type MenuProps = {
  menuName: string;
  isOpen: boolean;
  options: { text: string; onClick: Function }[];
};

export default function Menu({ menuName, isOpen, options }: MenuProps) {
  return (
    <ul className={`${menuName} ${isOpen ? 'open' : ''}`}>
      {options.map((option) => {
        return <li className={`${menuName}__option`}>{option.text}</li>;
      })}
    </ul>
  );
}
