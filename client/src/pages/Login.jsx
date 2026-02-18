// src/pages/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import Navbar from '../components/Navbar';  // ← NEW: Import the reusable Navbar
import '../css/Login.css';
// import './css/global.css';
import api from '../utils/api';
function Login() {
  // State for form inputs
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate(); // for redirecting after login

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatusMessage('');

    const loginData = { email, password };

    try {
      const response = await api.post('/auth/login', loginData);

      // Success
      const { token, role } = response.data;

      // Save token and role
      localStorage.setItem('token', token);
      localStorage.setItem('role', role);

      setStatusMessage('Login successful! Redirecting...');

      // Redirect based on role
      if (role === 'admin') {
        navigate('/admin-dashboard');
      } else {
        navigate('/my-complaints'); // or '/student-dashboard' — your choice
      }
    } catch (error) {
      // Error handling
      const errorMsg =
        error.response?.data?.message ||
        'Something went wrong. Please try again.';
      setStatusMessage(`❌ ${errorMsg}`);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Add reusable Navbar here – public page, so isAdmin=false */}
      {/* <Navbar isAdmin={false} /> */}

      {/* Your original login content */}
      <div className="auth-page">
      <div className="login-card">
        <h2>Login</h2>
        <p>Access your SpeakUp account</p>

        <form onSubmit={handleSubmit}>
          {/* Status message */}
          <p
            id="statusMsg"
            style={{
              textAlign: 'center',
              fontSize: '13px',
              color: statusMessage.includes('❌') ? 'red' : 'green',
            }}
          >
            {statusMessage}
          </p>

          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loading}
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={loading}
          />

          <button
            type="submit"
            className="login-btn"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className="footer-text">
          Don’t have an account?{' '}
          <a href="/student-signup">Sign Up</a>  {/* Later change to <Link> */}
        </div>
      </div>
      </div>
    </>
  );
}

export default Login;