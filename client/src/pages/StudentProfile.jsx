// src/pages/StudentProfile.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import '../css/StudentProfile.css';
import api from '../utils/api';

function StudentProfile() {
  const [user, setUser] = useState(null);
  const [totalComplaints, setTotalComplaints] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login');
          return;
        }

        const profileResponse = await api.get('/auth/profile');
        setUser(profileResponse.data);

        const complaintsResponse = await api.get('/complaints/my');
        setTotalComplaints(complaintsResponse.data.length);

        setLoading(false);
      } catch (err) {
        setError('Failed to load profile. Please login again.');
        setLoading(false);
        console.error(err);
      }
    };

    fetchProfile();
  }, [navigate]);

  if (loading) return <div style={{ textAlign: 'center', padding: '100px 0', color: '#64748b' }}>Loading profile...</div>;
  if (error || !user) return <div style={{ textAlign: 'center', padding: '100px 0', color: 'red' }}>{error || 'Unable to load profile'}</div>;

  return (
    <>
      <Navbar isAdmin={false} />
      <div className='page'>
      <div className="container">
        <div className="profile-card">
          <div className="avatar">
            {user.name?.charAt(0).toUpperCase() || 'S'}
          </div>
          <h2>{user.name || 'Student Name'}</h2>
          <p className="role">Student Account</p>

          <div className="info">
            <span>Student ID</span>
            <span>{user.studentID || 'N/A'}</span>
          </div>

          <div className="info">
            <span>Email</span>
            <span>{user.email || 'N/A'}</span>
          </div>

          <div className="info">
            <span>Total Complaints</span>
            <span>{totalComplaints}</span>
          </div>

          <div className="info">
            <span>Account Type</span>
            <span>Student</span>
          </div>

          <button onClick={() => navigate('/my-complaints')}>
            View My Complaints
          </button>
        </div>
      </div>

      <div className="footer">
        © 2026 SpeakUp
      </div>
      </div>
    </>
  );
}

export default StudentProfile;