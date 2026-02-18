// src/pages/Feedback.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import '../css/Feedback.css';
import api from '../utils/api';

function Feedback() {
  const [email, setEmail] = useState('');
  const [feedbackType, setFeedbackType] = useState('Suggestion');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus('');

    const feedbackData = {
      email,
      type: feedbackType,
      message,
    };

    try {
      const response = await api.post('/feedback', feedbackData);
      setStatus('✅ Feedback submitted successfully! Thank you.');
      setEmail('');
      setFeedbackType('Suggestion');
      setMessage('');
    } catch (error) {
      const errorMsg =
        error.response?.data?.message ||
        'Failed to submit feedback. Please try again.';
      setStatus(`❌ ${errorMsg}`);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar isAdmin={localStorage.getItem('role') === 'admin'} />
      <div className='page'>
      <div className="container">
        <div className="card">
          <h2>We Value Your Feedback 💬</h2>
          <p>Help us improve SpeakUp by sharing your thoughts</p>

          <form onSubmit={handleSubmit}>
            {status && (
              <p
                style={{
                  textAlign: 'center',
                  color: status.includes('❌') ? 'red' : 'green',
                  marginBottom: '15px',
                }}
              >
                {status}
              </p>
            )}

            <div className="form-group">
              <label>Email Address</label>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label>Feedback Type</label>
              <select
                value={feedbackType}
                onChange={(e) => setFeedbackType(e.target.value)}
                disabled={loading}
              >
                <option>Suggestion</option>
                <option>Bug Report</option>
                <option>User Experience</option>
                <option>Other</option>
              </select>
            </div>

            <div className="form-group">
              <label>Your Feedback</label>
              <textarea
                placeholder="Write your feedback here..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                disabled={loading}
              />
            </div>

            <button
              type="submit"
              className="submit"
              disabled={loading}
            >
              {loading ? 'Submitting...' : 'Submit Feedback'}
            </button>
          </form>
        </div>
      </div>
      </div>
    </>
  );
}

export default Feedback;