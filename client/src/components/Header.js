// Header.js
import React from 'react';
import logo from '../assets/logo.png';
import './Header.css';
import { Link } from 'react-router-dom';

const Header = () => {

  return (
    <div className="header">
      <Link to="/home">
      <img src={logo} alt="Carbs Guru Logo" className="logo-header" />
      </Link>
      <h1 className="header-title">Carbs Guru</h1>
      
    </div>
  );
};

export default Header;
