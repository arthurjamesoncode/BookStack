import { useNavigate } from 'react-router-dom';
import Menu from '../Menu/menu';

import {Stack } from '../../utils/types';

type AddBookMenuProps = {
  isOpen: boolean;
  stack: Stack | null;
};

export default function AddBookMenu({ isOpen, stack }: AddBookMenuProps) {
  const navigate = useNavigate();

  function goToSearch() {
    if (stack) navigate('/search', { state: { stack } });
  }

  function goToBookForm() {
    if (stack) navigate('/forms/book', { state: { stack, edit: false } });
  }

  function goToLibrary() {
    navigate('/library', { state: { stack } });
  }

  const options = [
    { text: 'Add new book from search', onClick: goToSearch },
    { text: 'Add new book', onClick: goToBookForm },
    { text: 'Add book from your library', onClick: goToLibrary },
  ];

  return <Menu menuType='bottom-menu' options={options} isOpen={isOpen} />;
}
