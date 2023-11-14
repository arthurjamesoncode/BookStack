import { useEffect, useState } from 'react';
import { Stack } from '../../utils/types';
import * as apiClient from '../../services/APIClient';
import StackComponent from '../StackPreview/StackPreview';

import './StackList.css';
import plusCircle from '../../assets/plus-circle.svg';
import { StackMenu } from '../StackMenu/StackMenu';
import AddBookMenu from '../AddBookMenu/AddBookMenu';
import StackForm from '../StackForm/StackForm';

export default function StackList() {
  const [stacks, setStacks] = useState<Stack[]>([]);
  const [stackMenuOpen, setStackMenuOpen] = useState(false);
  const [addBookMenuOpen, setAddBookMenuOpen] = useState(false);
  const [stackFormHidden, setStackFormHidden] = useState(true);
  const [currentStack, setCurrentStack] = useState<Stack | null>(null);
  const [editStack, setEditStack] = useState(false);

  useEffect(() => {
    apiClient.getUserStacks(1).then((result) => setStacks(result)); //1 is a placeholder until i do authenication
  }, []);

  function toggleStackMenu(stack: Stack) {
    setStackMenuOpen((prev) => !prev);
    if (stack) setCurrentStack(stack);
    setAddBookMenuOpen(false);
  }

  function toggleAddBookMenu(stack: Stack) {
    setAddBookMenuOpen((prev) => !prev);
    if (stack) setCurrentStack(stack);
    setStackMenuOpen(false);
  }

  function showStackForm(edit: boolean) {
    setStackFormHidden(false);
    setEditStack(edit);
  }
  function hideStackForm() {
    setStackFormHidden(true);
  }

  async function addOrEditStack(name: string) {
    const newStack = editStack
      ? await apiClient.editStack(name, currentStack!.id)
      : await apiClient.addStack(name);

    if (editStack) {
      setStacks((prev) =>
        prev.map((stack) => {
          return stack.id === currentStack!.id ? newStack : stack;
        })
      );
    } else setStacks((prev) => [...prev, newStack]);
  }

  async function deleteStack(stackId: number) {
    await apiClient.deleteStack(stackId);
    setStacks((prev) => prev.filter((stack) => stack.id !== stackId));
  }

  return (
    <div>
      <StackForm
        hideStackForm={hideStackForm}
        addOrEditStack={addOrEditStack}
        hidden={stackFormHidden}
        edit={editStack}
      />
      {stacks.map((stack) => (
        <StackComponent
          openStackMenu={() => toggleStackMenu(stack)}
          openAddBookMenu={() => toggleAddBookMenu(stack)}
          key={stack.id}
          stack={stack}
        />
      ))}
      <img
        className='img-button'
        id='new-stack'
        onClick={() => showStackForm(false)}
        src={plusCircle}
      />
      <StackMenu
        showStackForm={showStackForm}
        stack={currentStack}
        isOpen={stackMenuOpen}
        openAddBookMenu={toggleAddBookMenu}
        closeMenu={toggleStackMenu}
        deleteStack={deleteStack}
      />
      <AddBookMenu stack={currentStack} isOpen={addBookMenuOpen} />
    </div>
  );
}
