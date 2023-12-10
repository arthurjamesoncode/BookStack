import { useNavigate } from 'react-router-dom';
import { Stack } from '../../../utils/types';
import Menu from '../Menu/menu';
import { useAppSelector } from '../../../store';


type StackMenuProps = {
  isOpen: boolean;
  openAddBookMenu: (stack: Stack) => void;
  closeMenu: (stack: Stack) => void;
  deleteStack: (id: number) => void;
  showStackForm: (edit: boolean) => void;
};

export function StackMenu(props: StackMenuProps) {
  const {
    isOpen,
    openAddBookMenu,
    closeMenu,
    deleteStack,
    showStackForm,
  } = props;

  const navigate = useNavigate();

  const stack = useAppSelector((state) => state.stack.currentStack);

  function goToStackView() {
    navigate(`/view/stack`);
  }

  if (!stack) {
    return <></>;
  }

  const options = [
    { text: 'Add Book', onClick: () => openAddBookMenu(stack) },
    { text: 'View Stack', onClick: () => goToStackView() },
  ];

  if (stack.type === 'other') {
    options.push({
      text: 'Delete Stack',
      onClick: () => {
        deleteStack(stack.id);
        closeMenu(stack);
      },
    });
    options.push({
      text: 'Edit Stack:',
      onClick: () => {
        showStackForm(true);
        closeMenu(stack);
      },
    });
  }

  return <Menu menuType='bottom-menu' options={options} isOpen={isOpen} />;
}
