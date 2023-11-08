import logoIcon from '../assets/book-stack-icon.png';
import '../styles/Navbar.css'

export default function Navbar() {
  return (
    <header>
      <div className='heading-container'>
        <h1 className='heading'>BookStack</h1>
        <img className="logo-icon" src={logoIcon} />
      </div>
      <div className='menu-icon'>
        <div className='menu-line' />
        <div className='menu-line' />
        <div className='menu-line' />
      </div>
    </header>
  );
}
