// // Signin.js
// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import './Signin.css'; // Importez le fichier CSS
// import logo from '../assets/logo.png';

// const Signin = () => {
//   const [formData, setFormData] = useState({
//     email: '',
//     password: ''
//   });

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log('Form submitted', formData);
//   };

//   return (
//     <div className="login-container">
//       <div className="login-card">
//         <img src={logo} alt="Carbs Guru Logo" className="logo" />
//         <form onSubmit={handleSubmit}>
//           <div className="input-group">
//             <label>Email:</label>
//             <input
//               type="email"
//               name="email"
//               placeholder="Enter your email"
//               value={formData.email}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <div className="input-group">
//             <label>Password:</label>
//             <input
//               type="password"
//               name="password"
//               placeholder="Enter your password"
//               value={formData.password}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <button type="submit" className="login-button">Log in</button>
//         </form>
//         <p className="signup-link">
//           Don't have an account? <Link to="/signup">Subscribe here</Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Signin;

import React, { useState } from 'react';
import { signin } from '../api.js';
import { setToken } from '../auth.js';
import { useNavigate, Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import './Signin.css';

const SigninForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await signin(formData);
      setSuccess('Signin successful!');
      setError('');
      
      setToken(response.token);

      setFormData({
        email: '',
        password: '',
      });

      setTimeout(() => {
        navigate('/home');
      }, 1300);

    } catch (err) {
      setError(err.message || 'An error occurred during signin');
      setSuccess('');
    }
  };

  return (
    <div className="container">
      <div className="logo">
        <img src={logo} alt="Carbs Guru Logo" className="logo" />
      </div>
      {/* <h2>Carbs Guru</h2> */}
      <form onSubmit={handleSubmit}>
        <input
          className='signin-input'
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email"
          required
        />
        <input
          className='signin-input'
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter your password"
          required
        />
        <button className='signup-submit-btn' name='log in' type="submit">Log in</button>
      </form>
      <p className='signup-link'>
        <Link to="/signup">Sign up here</Link>
      </p>

      {error && (
        <div className="error">
          {error}
        </div>
      )}
      {success && (
        <div className="success">
          {success}
        </div>
      )}
    </div>
  );
};

export default SigninForm;