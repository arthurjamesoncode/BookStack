import { Route, Routes, useLocation } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { Provider } from 'react-redux';
import store from '../../store';

import StackList from '../StackList/StackList';
import StackView from '../StackView/StackView';
import BookForm from '../BookForm/BookForm';
import BookDetails from '../BookDetails/BookDetails';
import Search from '../Search/Search';
import SearchResultDetails from '../Search/SearchResultDetails/SearchResultDetails';
import Library from '../Library/Library';

function App() {
  const location = useLocation();

  return (
    <Provider store={store}>
      <TransitionGroup>
        <CSSTransition key={location.key} classNames='slide' timeout={300}>
          <Routes location={location}>
            <Route path='/' element={<StackList />} />
            <Route path='/view/stack' element={<StackView />} />
            <Route path='/forms/book' element={<BookForm />} />
            <Route path='/book' element={<BookDetails />} />
            <Route path='/search' element={<Search />} />
            <Route
              path='/search/details/:olid'
              element={<SearchResultDetails />}
            />
            <Route path='/library' element={<Library />} />
          </Routes>
        </CSSTransition>
      </TransitionGroup>
    </Provider>
  );
}

export default App;
