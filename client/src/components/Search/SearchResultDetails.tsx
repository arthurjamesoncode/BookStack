import {
  useLoaderData,
  useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom';
import { SearchResult, SearchResultDetails, Stack } from '../../types';

import defaultBookIcon from '../../assets/default-book-icon.png';

import '../../styles/SearchResultDetails.css';

export default function SearchResultDetails() {
  const location = useLocation();
  const navigate = useNavigate();

  const { olid } = useParams();
  const { stack, result, imgUrl, hasImg } = location.state as {
    stack: Stack
    result: SearchResult;
    imgUrl: string;
    hasImg: boolean;
  };
  const data = useLoaderData() as SearchResultDetails;

  function goToAddBook() {
    const book: { [key: string]: string | number } = {
      title: result.title,
      author: result.author_name ? result.author_name.join('') : '',
      totalPages: data.number_of_pages ? data.number_of_pages : 0,
      bookType: 'paper',
      publisher: data.publishers ? data.publishers.join(', ') : '',
      ISBN: data.isbn_13[0],
      OLID: olid!,
      description: data.description ? data.description.value : '',
    };

    navigate('/forms/book', {
      state: { stack, book, edit: false },
    });
  }

  return (
    <div className='search-result-details'>
      <h2>{result.title}</h2>
      <img
        className='large-cover-img'
        src={hasImg ? `${imgUrl}-L.jpg` : defaultBookIcon}
      />
      <h3>by {result.author_name?.join(', ')}</h3>
      <h4>Published By:</h4>
      {data.publishers.join(', s')}
      <h4>Description: </h4>
      <div className='description-container'>
        {data.description != null
          ? data.description.value
          : 'No description available'}
      </div>
      <h4>ISBN: </h4>
      <p>{data.isbn_13[0]}</p>
      <h4>OLID: </h4>
      <p>{olid}</p>

      <button onClick={goToAddBook}>Add To Library</button>
    </div>
  );
}
