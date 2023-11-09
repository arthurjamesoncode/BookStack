import { createBrowserRouter } from 'react-router-dom';
import StackList from './components/StackList';
import StackView from './components/StackView';
import { getBooksInStack } from './services/APIClient';
import AddBookForm from './components/AddBookForm';
import BookDetails from './components/BookDetails';

const router = createBrowserRouter([
  {
    path: '/',
    element: <StackList />,
  },
  {
    path: '/view/stack',
    element: <StackView />,
  },
  {
    path: '/stacks/:stackId/add',
    element: <AddBookForm />
  },
  {
    path: '/books/:bookId',
    element: <BookDetails />
  }
]);

export default router;
