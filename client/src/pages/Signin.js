// Signin.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Signin.css'; // Importez le fichier CSS

const Signin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted', formData);
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <img src="../assets/logo.png" alt="Carbs Guru Logo" className="logo" />
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <label>Password:</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="login-button">Log in</button>
        </form>
        <p className="signup-link">
          Don't have an account? <Link to="/signup">Subscribe here</Link>
        </p>
      </div>
    </div>
  );
};

export default Signin;
