// src/pages/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import '../css/Home.css';

function Home() {
  return (
    <>
      <Navbar isAdmin={false} />
      <div className='page'>
      {/* Remove old header if it's duplicating navbar */}
      {/* <header>
        <div className="logo">SpeakUp</div>
        <nav>
          <Link to="/login">Login</Link>
          <Link to="#">About</Link>
          <Link to="#">Contact</Link>
        </nav>
      </header> */}

      {/* HERO SECTION */}
      <section className="hero">
        <div className="hero-text">
          <h1>
            A Safe Voice Against <span>Digital Harassment</span>
          </h1>
          <p>
            SpeakUp provides university students a secure platform to report online harassment,
            upload evidence, and transparently track administrative actions.
          </p>
          <div className="btn-group">
            <Link to="/student-signup" className="student-btn">
              🎓 Student Sign Up
            </Link>
            <Link to="/admin-signup" className="admin-btn">
              🛡️ Admin Sign Up
            </Link>
          </div>
        </div>

        <div className="hero-card">
          <h3>Why SpeakUp?</h3>
          <ul>
            <li>✔ Confidential & secure reporting</li>
            <li>✔ Evidence attachment support</li>
            <li>✔ Real-time complaint tracking</li>
            <li>✔ Authorized administrative handling</li>
            <li>✔ Privacy-focused system design</li>
          </ul>
        </div>
      </section>

      {/* TRUST STRIP */}
      <section className="trust-strip">
        <div className="trust-box">
          <h4>University Approved</h4>
          <p>Designed for academic environments</p>
        </div>
        <div className="trust-box">
          <h4>Privacy First</h4>
          <p>No data shared without consent</p>
        </div>
        <div className="trust-box">
          <h4>Responsible Action</h4>
          <p>Handled only by authorized personnel</p>
        </div>
      </section>

      {/* STATS */}
      <section className="stats">
        <div className="stat-box">
          <h2>100%</h2>
          <p>Confidential Reports</p>
        </div>
        <div className="stat-box">
          <h2>24/7</h2>
          <p>System Availability</p>
        </div>
        <div className="stat-box">
          <h2>Fast</h2>
          <p>Complaint Processing</p>
        </div>
      </section>

      {/* FOOTER */}
      <footer>© 2026 SpeakUp | Digital Harassment Reporting System</footer>
      </div>
    </>
  );
}

export default Home;