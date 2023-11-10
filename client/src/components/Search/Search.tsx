import { useState } from "react";
import SearchForm from "./SearchForm";
import { SearchResponse, SearchResult } from "../../types";
import { searchFor } from "../../services/OpenLibrary";
import SearchResultsPage from "./SearchResultPage";

export default function Search() {
  const [results, setResults] = useState([] as SearchResult[])

  async function onSearch (values : {[key: string] : string | number}) {
    const {searchText} = values as {searchText: string};

    const responseData : SearchResponse = await searchFor(searchText);

    setResults(responseData.docs);
  }

  return (
    <div className='search-container'>
      <SearchForm onSearch={onSearch}/>
      <SearchResultsPage page={results} />
    </div>
  );
}