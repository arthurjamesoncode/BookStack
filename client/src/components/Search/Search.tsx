import { useState } from 'react';
import SearchForm from './SearchForm/SearchForm';
import { SearchResponse, SearchResult } from '../../utils/types';
import { searchFor } from '../../services/OpenLibrary';
import SearchResultsPage from './SearchResultPage/SearchResultPage';

import './Search.css'

import leftArrow from '../../assets/arrow-left.svg';
import rightArrow from '../../assets/arrow-right.svg';

export default function Search() {
  const [results, setResults] = useState<SearchResult[]>([]);
  const [resultCount, setResultCount] = useState(0);
  const [index, setIndex] = useState(0);

  async function onSearch(values: Record<string, string | number>) {
    const { searchText } = values as { searchText: string };

    const responseData: SearchResponse = await searchFor(searchText);

    setResults(responseData.docs);
    setResultCount(responseData.docs.length);
  }

  function changeIndex(diff: number) {
    setIndex((prev) => prev + diff);
  }

  const pageTotal = Math.floor(resultCount / 10) + 1;
  const min = (index + 1) * 10 - 10;
  const max = (index + 1) * 10;
  return (
    <div className='search-container'>
      <SearchForm onSearch={onSearch} />
      <SearchResultsPage page={results.slice(min, max)} />
      {resultCount > 0 && (
        <div className='page-controls'>
          Page {index + 1} out of {pageTotal}
          <div>
          <img
            onClick={() => {
              if (index > 0) {
                changeIndex(-1);
              }
            }}
            src={leftArrow}
          />
          <img
            onClick={() => {
              if (index + 1 < pageTotal) {
                changeIndex(1);
              }
            }}
            src={rightArrow}
          />
          </div>
        </div>
      )}
    </div>
  );
}
