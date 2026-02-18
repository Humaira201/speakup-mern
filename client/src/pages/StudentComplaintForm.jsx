// src/pages/StudentComplaintForm.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import '../css/StudentComplaintForm.css';
import api from '../utils/api';

function StudentComplaintForm() {
  const [complaintType, setComplaintType] = useState('');
  const [platform, setPlatform] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [evidence, setEvidence] = useState(null);
  const [statusMessage, setStatusMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatusMessage('');

    // Basic validation
    if (!complaintType || !platform || !description) {
      setStatusMessage('❌ Please fill all required fields');
      setLoading(false);
      return;
    }

    // Prepare FormData for file upload
    const formData = new FormData();
    formData.append('type', complaintType);
    formData.append('platform', platform);
    formData.append('description', description);
    if (date) formData.append('date', date);
    if (evidence) formData.append('evidence', evidence);

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setStatusMessage('❌ Please login first');
        navigate('/login');
        return;
      }

      const response = await api.post('/complaints', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setStatusMessage('✅ Complaint submitted successfully!');
      
      // Clear form
      setComplaintType('');
      setPlatform('');
      setDescription('');
      setDate('');
      setEvidence(null);

      // Redirect to my complaints
      setTimeout(() => navigate('/my-complaints'), 2000);
    } catch (error) {
      const errorMsg =
        error.response?.data?.message ||
        'Failed to submit complaint. Please try again.';
      setStatusMessage(`❌ ${errorMsg}`);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <Navbar isAdmin={false} />
      <div className='page'>
      {/* Main centered container */}
      <div className="container">
        <div className="complaint-card">
          <h2>Submit a Complaint</h2>
          <p>Report digital harassment safely and confidentially.</p>

          {/* Status message */}
          {statusMessage && (
            <p
              style={{
                textAlign: 'center',
                color: statusMessage.includes('❌') ? 'red' : 'green',
                marginBottom: '20px',
                fontSize: '14px',
              }}
            >
              {statusMessage}
            </p>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Complaint Type</label>
              <select
                value={complaintType}
                onChange={(e) => setComplaintType(e.target.value)}
                required
                disabled={loading}
              >
                <option value="">Select Complaint Type</option>
                <option>Cyberbullying</option>
                <option>Fake Account</option>
                <option>Threats</option>
                <option>Harassment</option>
              </select>
            </div>

            <div className="form-group">
              <label>Platform</label>
              <select
                value={platform}
                onChange={(e) => setPlatform(e.target.value)}
                required
                disabled={loading}
              >
                <option value="">Select Platform</option>
                <option>Facebook</option>
                <option>Instagram</option>
                <option>WhatsApp</option>
                <option>Other</option>
              </select>
            </div>

            <div className="form-group">
              <label>Description</label>
              <textarea
                placeholder="Describe the issue..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label>Date</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label>Evidence Upload (Optional)</label>
              <input
                type="file"
                accept="image/*,.pdf"
                onChange={(e) => setEvidence(e.target.files[0])}
                disabled={loading}
              />
            </div>

            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? 'Submitting...' : 'Submit Complaint'}
            </button>
          </form>
        </div>
      </div>
      </div>
    </>
  );
}

export default StudentComplaintForm;