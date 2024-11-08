// Footer.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer>
      <div className='legal-notice'>
        <p>
          <Link to="/legalnotice" className='legal-text'>Legal Notice</Link>
        </p>
      </div>
      {/* <p>&copy; Lucie & Maylis</p> */}
    </footer>
  );
};

export default Footer;
