import { useEffect, useState } from 'react';
import { Stack } from '../types';
import { getUserStacks } from '../services/APIClient';
import StackComponent from './StackComponent';

import '../styles/StackList.css'

export default function StackList() {
  const [stacks, setStacks] = useState([] as Stack[]);

  useEffect(() => {
    getUserStacks(1).then((result) => setStacks(result)); //1 is a placeholder until i do authenication
  }, []);

  return (
    <main>
      {stacks.map((stack) => (
        <StackComponent key={stack.id} stack={stack} />
      ))}
      <button id='new-stack'>Add New Stack</button>
    </main>
  );
}
