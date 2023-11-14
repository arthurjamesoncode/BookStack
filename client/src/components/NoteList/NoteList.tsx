import { useEffect, useState } from 'react';
import { Note } from '../../utils/types';
import { getNotesByBook } from '../../services/APIClient';
import NoteCard from '../NoteCard/NoteCard';

type NoteListProps = {
  bookId: number;
  openMenu: () => void;
  refresh: boolean
};

export default function NoteList({ bookId, openMenu, refresh }: NoteListProps) {
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    getNotesByBook(bookId).then((result) => setNotes(result));
  }, [refresh]);

  return (
    <div className='note-list-container'>
      {notes.length === 0 ? (
        <div className='No notes message'>No notes yet. Add one below.</div>
      ) : (
        notes.map((note) => {
          return <NoteCard note={note} />;
        })
      )}
      <button onClick={openMenu}>Add new note</button>
    </div>
  );
}
