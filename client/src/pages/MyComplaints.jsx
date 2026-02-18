// src/pages/MyComplaints.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import '../css/MyComplaints.css';
import api from '../utils/api';

function MyComplaints() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const fetchMyComplaints = async () => {
      try {
        const response = await api.get('/complaints/my');
        setComplaints(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load your complaints. Please login again.');
        setLoading(false);
        console.error(err);
      }
    };

    fetchMyComplaints();
  }, [navigate]);

  return (
    <>
      <Navbar isAdmin={false} />
      <div className='page'>

      <div className="mycomplaints-container">
        <h1 className="mycomplaints-title">My Complaints</h1>
        <p className="mycomplaints-subtitle">
          Track the status of your reported digital harassment cases.
        </p>

        {complaints.length === 0 ? (
          <div className="mycomplaints-empty">
            You haven't submitted any complaints yet.
          </div>
        ) : (
          complaints.map((complaint) => (
            <details key={complaint._id} className="mycomplaints-card">
              <summary className="mycomplaints-summary">
                <div className="mycomplaints-info">
                  <h3>{complaint.type}</h3>
                  <div className="mycomplaints-meta">
                    {complaint.platform} • {new Date(complaint.date).toLocaleDateString()}
                  </div>
                </div>
                <span className={`mycomplaints-status ${complaint.status.toLowerCase().replace(/\s+/g, '-')}`}>
                  {complaint.status}
                </span>
              </summary>

              <div className="mycomplaints-details">
                <p><strong>Description:</strong> {complaint.description}</p>
                <p>
                  <strong>Evidence:</strong>{' '}
                  {complaint.evidence ? (
                    <a href={`http://localhost:5000/uploads/${complaint.evidence}`} target="_blank" rel="noopener noreferrer">
                      View Evidence
                    </a>
                  ) : (
                    'No evidence uploaded'
                  )}
                </p>
                <p>
                  <strong>Admin Response:</strong> {complaint.adminNote || 'No response yet.'}
                </p>
              </div>
            </details>
          ))
        )}
      </div>

      <footer className="mycomplaints-footer">
        CUET • Privacy & Ethics
      </footer>
      </div>
    </>
  );
}

export default MyComplaints;