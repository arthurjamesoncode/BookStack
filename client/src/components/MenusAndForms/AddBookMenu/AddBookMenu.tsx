import { useNavigate } from 'react-router-dom';
import Menu from '../Menu/menu';

import { useAppSelector } from '../../../store';

type AddBookMenuProps = {
  isOpen: boolean;
};

export default function AddBookMenu(props: AddBookMenuProps) {
  const { isOpen } = props;

  const navigate = useNavigate();

  const stack = useAppSelector((state) => state.stack.currentStack);

  function goToSearch() {
    if (stack) {
      navigate('/search');
    }
  }

  function goToBookForm() {
    if (stack) {
      navigate('/forms/book', { state: { edit: false } });
    }
  }

  function goToLibrary() {
    if (stack) {
      navigate('/library');
    }
  }

  const options = [
    { text: 'Add new book from search', onClick: goToSearch },
    { text: 'Add new book', onClick: goToBookForm },
    { text: 'Add book from your library', onClick: goToLibrary },
  ];

  return <Menu menuType='bottom-menu' options={options} isOpen={isOpen} />;
}
