import { SearchResult, Stack } from '../../utils/types';

import { useEffect, useState } from 'react';
import { getCoverUrl, hasCover } from '../../services/OpenLibrary';

import defaultBookIcon from '../../assets/default-book-icon.png';
import '../../styles/SearchResultCard.css';
import { useLocation, useNavigate } from 'react-router-dom';

type SearchResultCardProps = {
  result: SearchResult;
  id: number;
};

export default function SearchResultCard({ result }: SearchResultCardProps) {
  const navigate = useNavigate();
  const location = useLocation()
  const { stack } = location.state as {stack: Stack}

  let olid = result.cover_edition_key;
  if (!olid) olid = result.edition_key[0];

  const imgUrl = getCoverUrl('olid', olid);

  //the hasImg thing is just there becauase for some reason openlibrary
  //doesn't return response code 404 unless you query the json cover api,
  //which makes it really hard to have a default icon
  const [hasImg, setHasImg] = useState(false);

  useEffect(() => {
    hasCover(imgUrl).then((result) => setHasImg(result));
  }, [imgUrl]);

  function goToResultInfo() {
    navigate(`/search/details/${olid}`, { state: { stack, result, imgUrl, hasImg } });
  }

  return (
    <div
      onClick={() => goToResultInfo()}
      className='result-card-container grid'
    >
      <img
        className='search-cover-img'
        src={hasImg ? `${imgUrl}-M.jpg` : defaultBookIcon}
        alt={`The cover of ${result.title}`}
        loading='lazy'
      />

      <div className='result-info-container'>
        <h3>{result.title}</h3>
        <p>by {result.author_name?.join(', ')}</p>
      </div>
    </div>
  );
}
