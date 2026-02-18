// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route,Link } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';

import Login from './pages/Login';
import StudentSignup from './pages/StudentSignup';
import AdminSignup from './pages/AdminSignup';
import Home from './pages/Home';
import StudentComplaintForm from './pages/StudentComplaintForm';
import MyComplaints from './pages/MyComplaints';
import StudentProfile from './pages/StudentProfile';
import AdminDashboard from './pages/AdminDashboard';
import Feedback from './pages/Feedback';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public pages */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/student-signup" element={<StudentSignup />} />
        <Route path="/admin-signup" element={<AdminSignup />} />

        {/* Protected student pages */}
        <Route
          path="/complaint-form"
          element={
            <ProtectedRoute>
              <StudentComplaintForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/my-complaints"
          element={
            <ProtectedRoute>
              <MyComplaints />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <StudentProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/feedback"
          element={
            <ProtectedRoute>
              <Feedback />
            </ProtectedRoute>
          }
        />

        {/* Protected admin page */}
        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute requiredRole="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* 404 catch-all */}
        <Route path="*" element={<div style={{ padding: '100px', textAlign: 'center' }}>
          <h1>404 - Page Not Found</h1>
          <Link to="/">Go Home</Link>
        </div>} />
      </Routes>
    </Router>
  );
}

export default App;