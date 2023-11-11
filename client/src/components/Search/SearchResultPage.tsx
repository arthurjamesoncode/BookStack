import { SearchResult } from '../../utils/types';
import SearchResultCard from './SearchResultCard';

type SearchResultsPageProps = {
  page: SearchResult[];
};

export default function SearchResultsPage({ page }: SearchResultsPageProps) {
  let resultId = -1
  return (
    <div className='search-results-container'>
      {page.map((result) => {
        resultId++
        return <SearchResultCard key={resultId} id={resultId} result={result}/>
      })}
    </div>
  );
}
