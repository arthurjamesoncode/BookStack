import { Route, Routes, useLocation } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import StackList from './components/StackList/StackList';
import StackView from './components/StackView/StackView';
import BookForm from './components/BookForm/BookForm';
import BookDetails from './components/BookDetails/BookDetails';
import Search from './components/Search/Search';
import SearchResultDetails from './components/Search/SearchResultDetails/SearchResultDetails';
import Library from './components/Library/Library';

export default function Router() {
  const location = useLocation();
  
  return (
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
  );
}
