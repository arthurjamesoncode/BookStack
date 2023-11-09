import {useLoaderData} from 'react-router-dom';
import { Book } from '../types';


export default function StackView() {

  const books = useLoaderData() as Book[]

  return <div>{books.map(book => <h2>{book.title}</h2>)}</div>
}