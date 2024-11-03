// // Signup.js
// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import './Signup.css'; // Importez le fichier CSS
// import logo from '../assets/logo.png';

// //A changer pour que l'enregistrement des infos soit réglé par la database
// const Signup = () => {
//   const [formData, setFormData] = useState({
//     email: '',
//     username: '',
//     password: '',
//     confirmPassword: ''
//   });

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Ici, vous pouvez ajouter la logique de validation et de soumission du formulaire
//     if (formData.password !== formData.confirmPassword) {
//       alert("Passwords do not match");
//       return;
//     }
//     // Envoyer les données du formulaire à l'API ou les traiter ici
//     console.log('Form submitted', formData);
//   };

//   return (
//     <div className="subscribe-container">
//       <div className="subscribe-card">
//       <img src={logo} alt="Carbs Guru Logo" className="logo" />
//       <form onSubmit={handleSubmit}>
//         <div className="input-group">
//           <label>Email:</label>
//           <input
//             type="email"
//             name="email"
//             placeholder="Enter your email"
//             value={formData.email}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div className="input-group">
//           <label>Username:</label>
//           <input
//             type="text"
//             name="username"
//             placeholder="Enter your username"
//             value={formData.username}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div className="input-group">
//           <label>Password:</label>
//           <input
//             type="password"
//             name="password"
//             placeholder="Enter your password"
//             value={formData.password}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div className="input-group">
//           <label>Confirm Password:</label>
//           <input
//             type="password"
//             name="confirmPassword"
//             placeholder="Confim password"
//             value={formData.confirmPassword}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <button type="submit" className="subscribe-button">Sign Up</button>
//       </form>
//       <p className="signin-link">
//         Already have an account? <Link to="/signin">Login here</Link>
//       </p>
//       </div>
//     </div>
//   );
// };

// export default Signup;


// import React, { useState } from 'react';
// import { signup } from '../api.js';

// const SignupForm = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     password: '',
//   });
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await signup(formData);
//       setSuccess('Signup successful!');
//       setError('');
//       // You might want to store the token in localStorage or a state management solution
//       localStorage.setItem('token', response.token);
//     } catch (err) {
//       setError(err.message || 'An error occurred during signup');
//       setSuccess('');
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input
//         type="text"
//         name="name"
//         value={formData.name}
//         onChange={handleChange}
//         placeholder="Name"
//         required
//       />
//       <input
//         type="email"
//         name="email"
//         value={formData.email}
//         onChange={handleChange}
//         placeholder="Email"
//         required
//       />
//       <input
//         type="password"
//         name="password"
//         value={formData.password}
//         onChange={handleChange}
//         placeholder="Password"
//         required
//       />
//       <button type="submit">Sign Up</button>
//       {error && <p style={{ color: 'red' }}>{error}</p>}
//       {success && <p style={{ color: 'green' }}>{success}</p>}
//     </form>
//   );
// };

// export default SignupForm;


// import React, { useState } from 'react';
// import { signup } from '../api.js';
// import { setToken } from '../auth.js'; // Import the setToken function
// import { useNavigate } from 'react-router-dom'; // Import for navigation after signup

// const SignupForm = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     password: '',
//   });
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await signup(formData);
//       setSuccess('Signup successful!');
//       setError('');
      
//       // Use setToken instead of directly using localStorage
//       setToken(response.token);
      
//       // Optional: Clear the form
//       setFormData({
//         name: '',
//         email: '',
//         password: '',
//       });

//       // Optional: Redirect to another page (e.g., profile or dashboard)
//       setTimeout(() => {
//         navigate('/profile'); // or wherever you want to redirect after signup
//       }, 1500); // Small delay to show the success message

//     } catch (err) {
//       setError(err.message || 'An error occurred during signup');
//       setSuccess('');
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
//       <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <input
//             type="text"
//             name="name"
//             value={formData.name}
//             onChange={handleChange}
//             placeholder="Name"
//             required
//             className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>
//         <div>
//           <input
//             type="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             placeholder="Email"
//             required
//             className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>
//         <div>
//           <input
//             type="password"
//             name="password"
//             value={formData.password}
//             onChange={handleChange}
//             placeholder="Password"
//             required
//             className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>
//         <button 
//           type="submit"
//           className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
//         >
//           Sign Up
//         </button>
//       </form>
      
//       {error && (
//         <div className="mt-4 p-2 bg-red-100 text-red-700 rounded">
//           {error}
//         </div>
//       )}
//       {success && (
//         <div className="mt-4 p-2 bg-green-100 text-green-700 rounded">
//           {success}
//         </div>
//       )}
//     </div>
//   );
// };

// export default SignupForm;


import React, { useState } from 'react';
import { signup } from '../api.js';
import { setToken } from '../auth.js';
import { useNavigate, Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import './Signup.css';

const SignupForm = () => {
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
      const response = await signup(formData);
      setSuccess('Signup successful!');
      setError('');
      
      setToken(response.token);

      setFormData({
        email: '',
        password: '',
      });

      setTimeout(() => {
        navigate('/profile');
      }, 1500);

    } catch (err) {
      setError(err.message || 'An error occurred during signup');
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
          className='signup-input'
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter your name"
          required
        />
        <input
          className='signup-input'
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email"
          required
        />
        <input
          className='signup-input'
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter your password"
          required
        />
        <button type="submit" className='signup-submit-btn'>Sign up</button>
      </form>
      <p className='signin-link'>
        <Link to="/signin">Log in here</Link>
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

export default SignupForm;

