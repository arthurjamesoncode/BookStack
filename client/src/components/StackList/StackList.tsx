import { useEffect, useState } from 'react';
import { Stack } from '../../utils/types';
import { getUserStacks } from '../../services/APIClient';
import StackComponent from '../StackPreview/StackPreview';

import './StackList.css'
import Menu from '../Menu/menu';
import { StackMenu } from '../StackMenu/StackMenu';

export default function StackList() {
  const [stacks, setStacks] = useState<Stack[]>([]);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    getUserStacks(1).then((result) => setStacks(result)); //1 is a placeholder until i do authenication
  }, []);

  function openMenu () {
    setMenuOpen(prev => !prev)
  }

  return (
    <main>
      {stacks.map((stack) => (
        <StackComponent openMenu={openMenu} key={stack.id} stack={stack} />
      ))}
      <button id='new-stack'>Add New Stack</button>
      <StackMenu isOpen={menuOpen} />
    </main>
  );
}
