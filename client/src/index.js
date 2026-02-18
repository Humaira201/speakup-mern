// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/global.css';           // if you have global styles (optional)
import App from './App';
// import reportWebVitals from './reportWebVitals';  // optional

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Optional — remove if you don't need performance measuring
// reportWebVitals();