// src/pages/AdminSignup.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
// import axios from 'axios';
// import Navbar from '../components/Navbar';
// Import your CSS
import '../css/AdminSignup.css';
import api from '../utils/api';
function AdminSignup() {
  // Form state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [adminId, setAdminId] = useState('');
  const [password, setPassword] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatusMessage('');

    // Basic validation
    if (!name || !email || !adminId || !password) {
      setStatusMessage('❌ Please fill all required fields');
      setLoading(false);
      return;
    }

    const adminData = {
      name,
      email,
      adminID: adminId,        // match your backend model (adminID)
      password,
      role: 'admin'            // Important: tell backend this is admin
    };

    try {
      // const response = await axios.post(
      //   'http://localhost:5000/api/auth/register',
      //   adminData,
      //   {
      //     headers: { 'Content-Type': 'application/json' },
      //   }
      // );
      const response = await api.post('/auth/register', adminData);
      // Success
      setStatusMessage('Admin account created successfully! Redirecting to login...');
      
      // Optional: auto-login by saving token
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('role', response.data.role);
        setTimeout(() => navigate('/admin-dashboard'), 1500);
      } else {
        // If no auto-login, redirect to login page
        setTimeout(() => navigate('/login'), 2000);
      }

      // Clear form
      setName('');
      setEmail('');
      setAdminId('');
      setPassword('');
    } catch (error) {
      const errorMsg =
        error.response?.data?.message ||
        'Failed to create admin account. Please try again.';
      setStatusMessage(`❌ ${errorMsg}`);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    {/* <Navbar isAdmin={false} /> */}
    <div className="auth-page">
    <div className="admin-card">
      <h2>Admin Sign Up</h2>
      <p>Authorized personnel only</p>

      <form onSubmit={handleSubmit}>
        {/* Status message */}
        <p
          id="statusMsg"
          style={{
            textAlign: 'center',
            fontSize: '13px',
            color: statusMessage.includes('❌') ? 'red' : 'green',
            marginBottom: '15px',
          }}
        >
          {statusMessage}
        </p>

        <label>Admin Name</label>
        <input
          type="text"
          placeholder="Full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          disabled={loading}
        />

        <label>Official Email</label>
        <input
          type="email"
          placeholder="admin@university.edu"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={loading}
        />

        <label>Admin ID</label>
        <input
          type="text"
          placeholder="University-issued admin ID"
          value={adminId}
          onChange={(e) => setAdminId(e.target.value)}
          required
          disabled={loading}
        />

        <label>Password</label>
        <input
          type="password"
          placeholder="Create a strong password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          disabled={loading}
        />

        <div className="notice">
          Admin accounts are subject to verification by the university authority before activation.
        </div>

        <button
          type="submit"
          className="admin-btn"
          disabled={loading}
        >
          {loading ? 'Creating...' : 'Create Admin Account'}
        </button>
      </form>

      <div className="footer-text">
        Already registered? <Link to="/login">Admin Login</Link>
      </div>
    </div>
    </div>
    </>
  );
}

export default AdminSignup;