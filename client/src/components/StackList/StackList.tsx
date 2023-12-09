import { useEffect, useState } from 'react';
import { Stack } from '../../utils/types';
import * as apiClient from '../../services/APIClient';
import StackComponent from '../StackPreview/StackPreview';

import './StackList.css';
import plusCircle from '/assets/plus-circle.svg';
import { StackMenu } from '../MenusAndForms/StackMenu/StackMenu';
import AddBookMenu from '../MenusAndForms/AddBookMenu/AddBookMenu';
import StackForm from '../MenusAndForms/StackForm/StackForm';
import { useAppDispatch, useAppSelector } from '../../store';
import { editStack, setCurrentStack, setStacks } from '../../store/slices/stackSlice';

export default function StackList() {
  const dispatch = useAppDispatch();
  const stacks = useAppSelector((state) => state.stack.stacks);

  const [bottomMenu, setBottomMenu] = useState<
    'stackMenu' | 'bookMenu' | 'stackForm' | null
  >(null);
  const currentStack = useAppSelector((state) => state.stack.currentStack);
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    getStacks();
  }, []);

  async function getStacks() {
    const stacks = await apiClient.getUserStacks(1); //1 is a placeholder until i do authenication
    dispatch(setStacks(stacks));
  }

  function toggleMenu(menu: 'stackMenu' | 'bookMenu', stack: Stack) {
    setBottomMenu((prev) => (prev === menu ? null : menu));
    dispatch(setCurrentStack(stack));
  }

  function showStackForm(edit: boolean) {
    setBottomMenu((prev) => (prev === 'stackForm' ? null : 'stackForm'));
    setEdit(edit);
  }

  function hideStackForm() {
    setBottomMenu(null);
  }

  async function addOrEditStack(name: string) {
    const newStack = edit
      ? await apiClient.editStack(name, currentStack!.id)
      : await apiClient.addStack(name);

    if (edit) dispatch(editStack(newStack));
    else dispatch(setStacks([...stacks, newStack]));
  }

  async function deleteStack(stackId: number) {
    await apiClient.deleteStack(stackId);
    setStacks(stacks.filter((stack) => stack.id !== stackId));
  }

  return (
    <div>
      {stacks.map((stack) => (
        <StackComponent
          openStackMenu={() => toggleMenu('stackMenu', stack)}
          openAddBookMenu={() => toggleMenu('stackMenu', stack)}
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
        isOpen={bottomMenu === 'stackMenu'}
        openAddBookMenu={() => toggleMenu('bookMenu', currentStack!)}
        closeMenu={() => toggleMenu('stackMenu', currentStack!)}
        deleteStack={deleteStack}
      />
      <AddBookMenu stack={currentStack} isOpen={bottomMenu === 'bookMenu'} />
      <StackForm
        hideStackForm={hideStackForm}
        addOrEditStack={addOrEditStack}
        open={bottomMenu === 'stackForm'}
        edit={edit}
      />
    </div>
  );
}
