import { SearchResult } from '../../types';

import defaultBookIcon from '../../assets/default-book-icon.png';
import '../../styles/SearchResultCard.css';
import { useEffect, useState } from 'react';
import { getCoverUrl, hasCover } from '../../services/OpenLibrary';

type SearchResultCardProps = {
  result: SearchResult;
  id: number;
};

export default function SearchResultCard({ result }: SearchResultCardProps) {
  let imgUrl = '';
  if (result.cover_edition_key) {
    imgUrl = getCoverUrl('olid', result.cover_edition_key);
  } else if (result.edition_key.length) {
    imgUrl = getCoverUrl('olid', result.edition_key[0]);
  }

  const [hasImg, setHasImg] = useState(false);

  useEffect(() => {
    hasCover(imgUrl).then((result) => setHasImg(result));
  }, []);

  return (
    <div className='result-card-container grid'>
      <div className='image-container'>
        <img
          className='search-cover-img'
          src={hasImg ? `${imgUrl}-M.jpg` : defaultBookIcon}
          alt={`The cover of ${result.title}`}
          loading='lazy'
        />
      </div>
    </div>
  );
}
