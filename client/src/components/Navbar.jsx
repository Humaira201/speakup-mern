// src/components/Navbar.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar({ isAdmin = false }) {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <div className="navbar">
      <div className="logo">SpeakUp</div>

      {token ? (
        <div className="nav-links">
          {role === 'admin' ? (
            <>
              <Link to="/admin-dashboard">Dashboard</Link>
              <button className="feedback-btn">Add Feedback</button>
            </>
          ) : (
            <>
              <Link to="/complaint-form">Complaint Form</Link>
              <Link to="/my-complaints">My Complaints</Link>
              <Link to="/profile">Profile</Link>
              <Link to="/feedback">Feedback</Link>
            </>
          )}
          <button onClick={handleLogout} style={{ marginLeft: '20px', background: '#ef4444', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer' }}>
            Logout
          </button>
        </div>
      ) : (
        <div className="nav-links">
          <Link to="/login">Login</Link>
          <Link to="/student-signup">Student Sign Up</Link>
          <Link to="/admin-signup">Admin Sign Up</Link>
        </div>
      )}
    </div>
  );
}

export default Navbar;