import { useParams } from 'react-router-dom';

import '../styles/AddBookForm.css';

export default function AddBookForm() {
  const { stackId } = useParams();

  return (
    <div className='form-container'>
      <h2>Add New Book To {stackId}</h2>
      <form>
        <div className='field'>
          <label htmlFor='title'>Title:</label>
          <input type='text' id='title' placeholder='Enter book title...' />
        </div>

        <div className='field'>
          <label htmlFor='author'>Author:</label>
          <input type='text' placeholder='Enter author name...' />
        </div>

        <div className='field'>
          <label htmlFor='page-total'>Total Pages:</label>
          <input
            type='number'
            id='page-total'
            placeholder='Enter page total...'
          />
        </div>
        <div className='field'>
          <label htmlFor='publisher'>Publisher:</label>
          <input type='text' id='publisher' placeholder='Enter publisher...' />
        </div>

        <div className='field'>
          <label htmlFor='isbn'>ISBN:</label>
          <input type='text' id='idbn' placeholder='Enter ISBN...' />
        </div>

        <div className='field'>
          <label htmlFor='olid'>ISBN:</label>
          <input type='text' id='olid' placeholder='Enter OLID...' />
        </div>

        <div className='field'>
          <label>Book type:</label>
          <div className='book-type'>
            <div className='radio-button'>
              <label htmlFor='paper'>Paper: </label>
              <input type='radio' id='paper' name='book-type' />
            </div>
            <div className='radio-button'>
              <label htmlFor='e-book'>E-Book: </label>
              <input type='radio' id='e-book' name='book-type' />
            </div>
            <div className='radio-button'>
              <label htmlFor='paper'>Audio Book: </label>
              <input type='radio' id='audio-book' name='book-type' />
            </div>
          </div>
        </div>

        <div className='field'>
          <label htmlFor='description'>Description:</label>
          <textarea id='description' placeholder='Enter a description...' />
        </div>

        <button type='submit'>Add Book</button>
      </form>
    </div>
  );
}
