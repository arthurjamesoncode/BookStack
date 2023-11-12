import { useState } from 'react';
import SearchForm from './SearchForm/SearchForm';
import { SearchResponse, SearchResult } from '../../utils/types';
import { searchFor } from '../../services/OpenLibrary';
import SearchResultsPage from './SearchResultPage/SearchResultPage';

export default function Search() {
  const [results, setResults] = useState<SearchResult[]>([]);

  async function onSearch(values: Record<string, string | number>) {
    const { searchText } = values as { searchText: string };

    const responseData: SearchResponse = await searchFor(searchText);

    setResults(responseData.docs);
  }

  return (
    <div className='search-container'>
      <SearchForm onSearch={onSearch} />
      <SearchResultsPage page={results} />
    </div>
  );
}
