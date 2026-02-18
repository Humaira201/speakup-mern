// src/pages/AdminDashboard.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import api from '../utils/api';
import '../css/AdminDashboard.css';

function AdminDashboard() {
  const [complaints, setComplaints] = useState([]);
  const [filteredComplaints, setFilteredComplaints] = useState([]);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [typeFilter, setTypeFilter] = useState('All Types');
  const [adminNote, setAdminNote] = useState('');
  const [newStatus, setNewStatus] = useState('Submitted');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [updateMessage, setUpdateMessage] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login');
          return;
        }

        const response = await api.get('/complaints');
        setComplaints(response.data);
        setFilteredComplaints(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load complaints. Please login again.');
        setLoading(false);
        console.error(err);
      }
    };

    fetchComplaints();
  }, [navigate]);

  useEffect(() => {
    let result = [...complaints];

    if (typeFilter !== 'All Types') {
      result = result.filter(c => c.type === typeFilter);
    }

    if (statusFilter !== 'All Status') {
      result = result.filter(c => c.status === statusFilter);
    }

    setFilteredComplaints(result);
  }, [typeFilter, statusFilter, complaints]);

  const handleSelectComplaint = (complaint) => {
    setSelectedComplaint(complaint);
    setNewStatus(complaint.status);
    setAdminNote(complaint.adminNote || '');
    setUpdateMessage('');
  };

  const handleUpdate = async () => {
    if (!selectedComplaint) return;

    setUpdateMessage('');

    try {
      const response = await api.put(
        `/complaints/${selectedComplaint._id}`,
        {
          status: newStatus,
          adminNote: adminNote,
        }
      );

      const updatedComplaints = complaints.map(c =>
        c._id === selectedComplaint._id ? response.data : c
      );
      setComplaints(updatedComplaints);
      setSelectedComplaint(response.data);
      setUpdateMessage('✅ Complaint updated successfully!');
    } catch (err) {
      setUpdateMessage(`❌ Failed to update: ${err.response?.data?.message || 'Server error'}`);
      console.error(err);
    }
  };

  if (loading) return <div className="empty">Loading complaints...</div>;
  if (error) return <div className="empty" style={{ color: 'red' }}>{error}</div>;

  return (
    <>
      <Navbar isAdmin={true} />
      <div className='page'>
      <div className="dashboard">
        <div className="main">
          <div className="panel left">
            <h3>Complaints</h3>
            <div className="filter">
              <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
                <option>All Types</option>
                <option>Fake Account</option>
                <option>Cyberbullying</option>
                <option>Blackmail</option>
              </select>
              <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                <option>All Status</option>
                <option>Submitted</option>
                <option>Reviewed</option>
                <option>Action Required</option>
                <option>Resolved</option>
              </select>
            </div>
            <div id="complaintList">
              {filteredComplaints.length === 0 ? (
                <div className="empty">No complaints found</div>
              ) : (
                filteredComplaints.map((c) => (
                  <div
                    key={c._id}
                    className={`complaint ${selectedComplaint?._id === c._id ? 'active' : ''}`}
                    onClick={() => handleSelectComplaint(c)}
                  >
                    <strong>{c.type} – {c.platform}</strong>
                    <br />
                    <small>Status: {c.status}</small>
                  </div>
                ))
              )}
            </div>
          </div>
          <div className="panel right">
            <h3>Complaint Details</h3>
            {!selectedComplaint ? (
              <div id="emptyState" className="empty">
                Select a complaint from the list to view details
              </div>
            ) : (
              <div id="details">
                <div className="details-box">
                  <p><strong>Student:</strong> {selectedComplaint.student?.name || 'Anonymous'}</p>
                  <p><strong>Platform:</strong> {selectedComplaint.platform}</p>
                  <p><strong>Description:</strong></p>
                  <p>{selectedComplaint.description}</p>
                  <p>
                    <strong>Evidence:</strong>{' '}
                    {selectedComplaint.evidence ? (
                      <a
                        href={`http://localhost:5000/uploads/${selectedComplaint.evidence}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View Evidence
                      </a>
                    ) : (
                      'No evidence uploaded'
                    )}
                  </p>
                </div>
                <label>Status</label>
                <select
                  id="statusSelect"
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value)}
                >
                  <option>Submitted</option>
                  <option>Reviewed</option>
                  <option>Action Required</option>
                  <option>Resolved</option>
                </select>
                <label>Admin Note</label>
                <textarea
                  placeholder="Write action or remarks..."
                  value={adminNote}
                  onChange={(e) => setAdminNote(e.target.value)}
                />
                {updateMessage && (
                  <p style={{ color: updateMessage.includes('❌') ? 'red' : 'green', marginTop: '10px' }}>
                    {updateMessage}
                  </p>
                )}
                <button className="update-btn" onClick={handleUpdate}>
                  Update Complaint
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      </div>
    </>
  );
}

export default AdminDashboard;