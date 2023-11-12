import { useNavigate } from 'react-router-dom';
import Menu from '../Menu/menu';

import './AddBookMenu.css';
import { Stack } from '../../utils/types';

type AddBookMenuProps = {
  isOpen: boolean;
  stack: Stack | null
}

export default function AddBookMenu({ isOpen, stack }: AddBookMenuProps) {
  const navigate = useNavigate();

  function goToSearch() {

    if (stack) navigate('/search', {state: {stack}})
  }

  function goToBookForm() {
    if (stack) navigate('forms/book', {state: {stack, edit: false}})
  }

  const options = [
    { text: 'Add book from search', onClick: goToSearch },
    { text: 'Add new book', onClick:  goToBookForm},
  ];

  return <Menu menuName='add-book-menu' options={options} isOpen={isOpen} />;
}
