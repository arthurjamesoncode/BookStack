import { useEffect, useState } from 'react';
import { Stack } from '../../utils/types';
import { getUserStacks } from '../../services/APIClient';
import StackComponent from '../StackPreview/StackPreview';

import './StackList.css';
import { StackMenu } from '../StackMenu/StackMenu';
import AddBookMenu from '../AddBookMenu/AddBookMenu';

export default function StackList() {
  const [stacks, setStacks] = useState<Stack[]>([]);
  const [stackMenuOpen, setStackMenuOpen] = useState(false);
  const [addBookMenuOpen, setAddBookMenuOpen] = useState(false);
  const [currentStack, setCurrentStack] = useState<Stack | null>(null);

  useEffect(() => {
    getUserStacks(1).then((result) => setStacks(result)); //1 is a placeholder until i do authenication
  }, []);

  function toggleStackMenu(stack: Stack) {
    setStackMenuOpen((prev) => !prev);
    setCurrentStack(stack);
    setAddBookMenuOpen(false);
  }

  function toggleAddBookMenu(stack: Stack) {
    setAddBookMenuOpen((prev) => !prev);
    setStackMenuOpen(false);
    setCurrentStack(stack);
  }

  return (
    <main>
      {stacks.map((stack) => (
        <StackComponent
          openStackMenu={() => toggleStackMenu(stack)}
          openAddBookMenu={() => toggleAddBookMenu(stack)}
          key={stack.id}
          stack={stack}
        />
      ))}
      <button id='new-stack'>Add New Stack</button>
      <StackMenu
        stack={currentStack!}
        isOpen={stackMenuOpen}
        openAddBookMenu={toggleAddBookMenu}
        closeMenu={toggleStackMenu}
      />
      <AddBookMenu stack={currentStack} isOpen={addBookMenuOpen} />
    </main>
  );
}
