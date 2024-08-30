// Home.js
import React from 'react';
import Header from '../components/Header.js';
import Footer from '../components/Footer.js';

const Home = () => {
  return (
    <div>
        <Header />
        <main>
            <h2>Welcome to the Home Page</h2>
            <p>This is the home page of our application.</p>
        </main>
        <Footer />
    </div>
  )
};

export default Home;
