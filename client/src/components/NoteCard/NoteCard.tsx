import { Note } from '../../utils/types';

import './NoteCard.css'

type NoteCardProps = {
  note: Note;
};

export default function NoteCard({ note }: NoteCardProps) {

  const time = new Date(note.createdAt).toLocaleDateString()

  return (
    <div className='note-card'>
      <div className='note-intro'>On {time} you wrote:</div>
      <div className='text-container'>{note.text}</div>
      <div className='place-in-book'>{note.page != null && note.page > 0 && `Page ${note.page}.`}</div>
    </div>
  );
}
