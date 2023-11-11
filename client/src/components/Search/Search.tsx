import { useState } from 'react';
import SearchForm from './SearchForm';
import { SearchResponse, SearchResult } from '../../utils/types';
import { searchFor } from '../../services/OpenLibrary';
import SearchResultsPage from './SearchResultPage';

export default function Search() {
  const [results, setResults] = useState([] as SearchResult[]);

  async function onSearch(values: Record<string, string | number>) {;

    const responseData: SearchResponse = await searchFor(values['searchText']);

    setResults(responseData.docs);
  }

  return (
    <div className='search-container'>
      <SearchForm onSearch={onSearch} />
      <SearchResultsPage page={results} />
    </div>
  );
}
