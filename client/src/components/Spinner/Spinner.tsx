import { RingLoader } from 'react-spinners';

export default function Spinner() {
  return (
    <div className='spinner'>
      <RingLoader color='#36D7B7' size={150} />
    </div>
  );
}
