import { createBrowserRouter } from 'react-router-dom';
import StackList from './components/StackList';
import StackView from './components/StackView';
import { getBooksInStack } from './services/APIClient';
import AddBookForm from './components/AddBookForm';

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
  },
  {
    path: '/stacks/:stackId/add',
    element: <AddBookForm />
  }
]);

export default router;
