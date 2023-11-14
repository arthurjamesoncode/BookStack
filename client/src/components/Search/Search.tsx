import { useState } from 'react';
import SearchForm from './SearchForm/SearchForm';
import { SearchResponse, SearchResult } from '../../utils/types';
import { searchFor } from '../../services/OpenLibrary';
import SearchResultsPage from './SearchResultPage/SearchResultPage';

import './Search.css';

import leftArrow from '../../assets/arrow-left.svg';
import rightArrow from '../../assets/arrow-right.svg';
import Spinner from '../Spinner/Spinner';

export default function Search() {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [resultCount, setResultCount] = useState(0);
  const [index, setIndex] = useState(0);

  async function onSearch(values: Record<string, string | number>) {
    setLoading(true);
    setIndex(0);

    const { searchText } = values as { searchText: string };

    const responseData: SearchResponse = await searchFor(searchText);

    setResults(responseData.docs);
    setResultCount(responseData.docs.length);
    setLoading(false);
  }

  function changeIndex(diff: number) {
    setIndex((prev) => prev + diff);
  }

  let pageTotal = Math.floor(resultCount / 10);
  if (resultCount % 10 > 0) pageTotal++;
  const min = (index + 1) * 10 - 10;
  const max = (index + 1) * 10;
  return (
    <div className='search-container'>
      <SearchForm onSearch={onSearch} />
      <SearchResultsPage page={results.slice(min, max)} />
      {loading ? (
        <Spinner />
      ) : (
        resultCount > 0 && (
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
        )
      )}
    </div>
  );
}
