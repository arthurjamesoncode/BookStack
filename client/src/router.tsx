import { createBrowserRouter } from 'react-router-dom';
import StackList from './components/StackList';
import StackView from './components/StackView';
import BookForm from './components/BookForm';


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
    path: 'forms/book',
    element: <BookForm />
  }
]);

export default router;
