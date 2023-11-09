import { createBrowserRouter } from 'react-router-dom';
import StackList from './components/StackList';
import StackView from './components/StackView';
import { getBooksInStack } from './services/APIClient';

const router = createBrowserRouter([
  {
    path: '/',
    element: <StackList />,
  },
  {
    path: '/stacks/:stackId',
    element: <StackView />,
    loader: async ({params}) => {
      return await getBooksInStack(Number(params.stackId))
    }
  }
]);

export default router;
