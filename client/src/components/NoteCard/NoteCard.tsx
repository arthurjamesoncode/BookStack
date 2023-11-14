import { Note } from '../../utils/types';

type NoteCardProps = {
  note: Note;
};

export default function NoteCard({ note }: NoteCardProps) {
  return <div className='note-card'>{note.text}</div>;
}
