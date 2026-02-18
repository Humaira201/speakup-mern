// src/pages/StudentSignup.jsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
// import axios from 'axios';
// import Navbar from '../components/Navbar';
// Import CSS
import "../css/StudentSignup.css";
import api from "../utils/api";
function StudentSignup() {
  // Form states
  const [name, setName] = useState("");
  const [studentId, setStudentId] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [anonymousName, setAnonymousName] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatusMessage("");

    // Validation
    if (!name || !studentId || !email || !password || !confirmPassword) {
      setStatusMessage("❌ Please fill all required fields");
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setStatusMessage("❌ Passwords do not match");
      setLoading(false);
      return;
    }

    const studentData = {
      name,
      studentID: studentId, // match your backend model field name
      email,
      password,
      role: "student",
      anonymousName: anonymousName || undefined,
    };

    try {
      // const response = await axios.post(
      //   'http://localhost:5000/api/auth/register',
      //   studentData,
      //   {
      //     headers: { 'Content-Type': 'application/json' },
      //   }
      // );
      const response = await api.post("/auth/register", studentData);
      // Success
      setStatusMessage("Account created successfully! Redirecting to login...");

      // Optional: auto-login
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("role", response.data.role);
        setTimeout(() => navigate("/my-complaints"), 1500);
      } else {
        // Redirect to login page
        setTimeout(() => navigate("/login"), 2000);
      }

      // Clear form
      setName("");
      setStudentId("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setAnonymousName("");
    } catch (error) {
      const errorMsg =
        error.response?.data?.message ||
        "Failed to create account. Please try again.";
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
        <div className="signup-card">
          <h2>Student Sign Up</h2>
          <p>Create your SpeakUp account securely</p>

          <form onSubmit={handleSubmit}>
            {/* Status message */}
            <p
              id="statusMsg"
              style={{
                textAlign: "center",
                fontSize: "13px",
                color: statusMessage.includes("❌") ? "red" : "green",
                marginBottom: "15px",
              }}
            >
              {statusMessage}
            </p>

            <label>Full Name</label>
            <input
              type="text"
              placeholder="Your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              disabled={loading}
            />

            <label>Student ID</label>
            <input
              type="text"
              placeholder="University student ID"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              required
              disabled={loading}
            />

            <label>University Email</label>
            <input
              type="email"
              placeholder="example@university.edu"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
            />

            <label>Password</label>
            <input
              type="password"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
            />

            <label>Confirm Password</label>
            <input
              type="password"
              placeholder="Re-enter password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              disabled={loading}
            />

            <div className="optional">
              <label>Anonymous Display Name (Optional)</label>
              <input
                type="text"
                placeholder="e.g. SilentVoice23"
                value={anonymousName}
                onChange={(e) => setAnonymousName(e.target.value)}
              />
              <span>This name will be visible if you choose anonymity.</span>
            </div>

            <button type="submit" className="signup-btn" disabled={loading}>
              {loading ? "Creating..." : "Create Account"}
            </button>
          </form>

          <div className="footer-text">
            Already have an account? <Link to="/login">Login</Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default StudentSignup;
