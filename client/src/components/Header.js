// Header.js
import React from 'react';
import logo from '../assets/logo.png';
import './Header.css';


const Header = () => {
  return (
    <div className="header">
      <img src={logo} alt="Carbs Guru Logo" className="logo-header" />
      <h1 className="header-title">Carbs Guru</h1>
    </div>
  );
};

export default Header;
