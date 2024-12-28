// src/components/Navbar.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../style/Navbar.css';

const Navbar = ({ isLoggedIn, user, setIsLoggedIn }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsLoggedIn(false); // Update login state
    navigate('/'); // Redirect to login page
  };

  return (
    <nav className="navbar">
      {/* Logo Section */}
      <div className="navbar-logo">
        <Link to="/">Interview_Portal</Link>
      </div>

      {/* Links Section - Visible only when logged in */}
      {isLoggedIn ? (
        <>
          <div className="navbar-links">
            <Link to="/about">About</Link>
            <Link to="/interviews">Interviews</Link>
          </div>

          {/* Profile Section - Display Profile Image and Logout Button */}
          <div className="navbar-profile">
            {user?.profileImage ? (
              <img
                src={user.profileImage}
                alt="Profile"
                className="navbar-profile-img"
              />
            ) : (
              <span className="navbar-profile-placeholder">User</span>
            )}
            <button className="logout-button" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </>
      ) : null}
    </nav>
  );
};

export default Navbar;
