import './App.css';

import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './pages/Home.js';
import About from './pages/About.js';
import Contact from './pages/Contact.js';
import Signup from './pages/Signup.js';
import Signin from './pages/Signin.js';
import Account from './pages/Account.js';
import { useLogoutFunction, useRedirectFunctions, withAuthInfo } from '@propelauth/react';

async function whoAmI(accessToken) {
  return fetch('http://localhost:3000/api/whoami', {
      method: 'GET',
      headers: {
          Authorization: `Bearer ${accessToken}`,
      },
  }).then((res) => res.json())
}

const App = withAuthInfo((props) => {
  const [serverResponse, setServerResponse] = useState(undefined)

  

  useEffect(()=> {
    whoAmI(props.accessToken).then(setServerResponse)
  }, [props.accessToken])

  console.log("propstoken : ", props.accessToken)

  const logoutFunction = useLogoutFunction();
  const { redirectToLoginPage, redirectToSignupPage, redirectToAccountPage } = useRedirectFunctions();

  console.log("Server response : ", serverResponse)

  if (props.isLoggedIn) {
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
            </ul>
          </nav>

          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/about" element={<About/>} />
            <Route path="/contact" element={<Contact/>} />
            <Route path="/signup" element={<Signup/>} />
            <Route path="/signin" element={<Signin/>} />
            <Route path="/account" element={<Account/>} />
          </Routes>
        </Router>
        
        <p>You are logged in as {props.user.email}</p>
            <button onClick={() => redirectToAccountPage()}>Account</button>
            <button onClick={() => logoutFunction(true)}>Logout</button>

            <div>
            <b>Server Response:</b>
            <p>{JSON.stringify(serverResponse, null, 2)}</p>
            </div>
      </div>
    );
  } else {
    return (
      <div>
          <p>You are not logged in</p>
          <button onClick={() => redirectToLoginPage()}>Login</button>
          <button onClick={() => redirectToSignupPage()}>Signup</button>

          <div>
            <b>Server Response:</b>
            <p>{JSON.stringify(serverResponse, null, 2)}</p>
          </div>
      </div>
    )
  }
  
})

export default App;
