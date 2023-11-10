import { createBrowserRouter } from 'react-router-dom';
import StackList from './components/StackList';
import StackView from './components/StackView';
import BookForm from './components/BookForm';
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
    path: '/forms/book',
    element: <BookForm />
  },
  {
    path: '/book',
    element: <BookDetails />
  }
]);

export default router;
