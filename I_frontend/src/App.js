// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import InterviewList from './components/InterviewList';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);  // Track login state
  const [user, setUser] = useState({}); // Placeholder for user details

  return (
    <Router>
      <Navbar isLoggedIn={isLoggedIn} user={user} setIsLoggedIn={setIsLoggedIn} />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Home setIsLoggedIn={setIsLoggedIn} setUser={setUser} />} />
          <Route path="/about" element={<About />} />
          <Route path="/interviews" element={<InterviewList />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
