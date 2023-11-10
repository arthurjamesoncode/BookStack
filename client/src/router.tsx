import { createBrowserRouter } from 'react-router-dom';
import StackList from './components/StackList';
import StackView from './components/StackView';
import BookForm from './components/BookForm';
import BookDetails from './components/BookDetails';
import Search from './components/Search/Search';
import SearchResultDetails from './components/Search/SearchResultDetails';
import { getEdition } from './services/OpenLibrary';


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
  },
  {
    path: '/search',
    element: <Search />
  },
  {
    path: '/search/details/:olid',
    element: <SearchResultDetails />,
    loader: async ({params}) => {
      return await getEdition(params.olid!)
    }
  }
]);

export default router;
