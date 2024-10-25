import './App.css';

//import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './pages/Home.js';
import About from './pages/About.js';
import Contact from './pages/Contact.js';
import Signup from './pages/Signup.js';
import Signin from './pages/Signin.js';
import Profile from './pages/Profile.js';
import EditGoals from './components/EditGoals.js';
import AddGoals from './components/AddGoals.js';

// async function whoAmI(accessToken) {
//   return fetch('http://localhost:3000/profile', {
//       method: 'GET',
//       headers: {
//           Authorization: `Bearer ${accessToken}`,
//       },
//   }).then((res) => res.json())
// }

const App = () => {
  
    return (
      <div className="App">
        <Router>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
              <Link to="/about">About</Link>
              </li>
              <li>
              <Link to="/contact">Contact</Link>
              </li>
              <li>
              <Link to="/signup">Sign up</Link>
              </li>
              <li>
              <Link to="/signin">Sign in</Link>
              </li>
              <li>
              <Link to="/profile">Claude profile</Link>
              </li>
            </ul>
          </nav>

          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/about" element={<About/>} />
            <Route path="/contact" element={<Contact/>} />
            <Route path="/signup" element={<Signup/>} />
            <Route path="/signin" element={<Signin/>} />
            <Route path="/goals" element={<AddGoals/>} />
            <Route path="/goals/:goalId" element={<EditGoals />} />
            <Route path="/profile" element={<Profile/>} />
          </Routes>
        </Router>
        
      </div>
    );
  
  
}

export default App;
