// Signup.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Signup.css'; // Importez le fichier CSS
import logo from '../assets/logo.png';

//A changer pour que l'enregistrement des infos soit réglé par la database
const Signup = () => {
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Ici, vous pouvez ajouter la logique de validation et de soumission du formulaire
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    // Envoyer les données du formulaire à l'API ou les traiter ici
    console.log('Form submitted', formData);
  };

  return (
    <div className="subscribe-container">
      <div className="subscribe-card">
      <img src={logo} alt="Carbs Guru Logo" className="logo" />
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
          <label>Username:</label>
          <input
            type="text"
            name="username"
            placeholder="Enter your username"
            value={formData.username}
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
        <div className="input-group">
          <label>Confirm Password:</label>
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confim password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="subscribe-button">Sign Up</button>
      </form>
      <p className="signin-link">
        Already have an account? <Link to="/signin">Login here</Link>
      </p>
      </div>
    </div>
  );
};

export default Signup;
