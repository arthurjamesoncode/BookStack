import React from 'react';
import ReactDOM from 'react-dom/client';
import Navbar from './components/Navbar/Navbar.tsx';

import './index.css';
import { BrowserRouter } from 'react-router-dom';
import App from './components/App/App.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Navbar />
      <BrowserRouter>
        <App />
      </BrowserRouter>
  </React.StrictMode>
);
