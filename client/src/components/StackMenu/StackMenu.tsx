import { useNavigate } from 'react-router-dom';
import { Stack } from '../../utils/types';
import Menu from '../Menu/menu';


import { deleteStack } from '../../services/APIClient';

type StackMenuProps = {
  isOpen: boolean;
  stack: Stack | null;
  openAddBookMenu: Function;
  closeMenu: Function;
};

export function StackMenu({
  isOpen,
  stack,
  openAddBookMenu,
  closeMenu,
}: StackMenuProps) {
  const navigate = useNavigate();

  function goToStackView() {
    navigate(`/view/stack`, {
      state: { stack },
    });
  }

  const options = [
    { text: 'Add Book', onClick: openAddBookMenu },
    { text: 'View Stack', onClick: goToStackView },
  ];

  if (stack && stack.type === 'other')
    options.push({
      text: 'Delete Stack',
      onClick: () => {
        deleteStack(stack.id);
        closeMenu();
      },
    });

  return <Menu menuType='bottom-menu' options={options} isOpen={isOpen} />;
}
