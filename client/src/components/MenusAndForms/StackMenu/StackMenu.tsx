import { useNavigate } from 'react-router-dom';
import { Stack } from '../../../utils/types';
import Menu from '../Menu/menu';
import { useAppDispatch } from '../../../store';
import { setCurrentStack } from '../../../store/slices/stackSlice';

type StackMenuProps = {
  isOpen: boolean;
  stack: Stack | null;
  openAddBookMenu: (stack: Stack) => void;
  closeMenu: (stack: Stack) => void;
  deleteStack: (id: number) => void;
  showStackForm: (edit: boolean) => void;
};

export function StackMenu({
  isOpen,
  stack,
  openAddBookMenu,
  closeMenu,
  deleteStack,
  showStackForm,
}: StackMenuProps) {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  
  function goToStackView() {
    dispatch(setCurrentStack(stack!));
    navigate(`/view/stack`, {
      state: { stack },
    });
  }

  const options = [
    { text: 'Add Book', onClick: () => openAddBookMenu(stack!) },
    { text: 'View Stack', onClick: () => goToStackView() },
  ];

  if (stack && stack.type === 'other') {
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
