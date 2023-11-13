import { createBrowserRouter } from 'react-router-dom';
import StackList from './components/StackList/StackList';
import StackView from './components/StackView/StackView';
import BookForm from './components/BookForm/BookForm';
import BookDetails from './components/BookDetails/BookDetails';
import Search from './components/Search/Search';
import SearchResultDetails from './components/Search/SearchResultDetails/SearchResultDetails';
import { getEdition } from './services/OpenLibrary';
import Library from './components/Library/Library';


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
  },
  {
    path: 'library',
    element: <Library />
  }
]);

export default router;
