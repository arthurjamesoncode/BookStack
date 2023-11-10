const url = 'https://openlibrary.org';
const searchFields =
  'title,author_name,edition_count,edition_key,cover_edition_key';

export async function searchFor(searchText: string) {
  const respsonse = await fetch(
    `${url}/search.json?q=${searchText}&fields=${searchFields}`,
    {
      method: 'GET',
    }
  );

  return await respsonse.json();
}

export function getCoverUrl(keyType: string, key: string) {
  return `https://covers.openlibrary.org/b/${keyType}/${key}`;
}

export async function hasCover(url: string) {
  const response = await fetch(`${url}.json`, {
    method: 'GET',
  });

  return response.status === 200;
}

export async function getEdition(olid: string) {
  const response = await fetch(`${url}/books/${olid}.json`, {
    method: 'GET',
  });

  const edition = await response.json()

  return edition
}
