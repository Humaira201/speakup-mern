const dns = require('node:dns/promises');
dns.setServers(['1.1.1.1', '8.8.8.8']);   // Cloudflare + Google DNS
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');

dotenv.config();
connectDB();// ← this line connects to Atlas

const app = express();

app.use(cors());
app.use(express.json());

// Serve uploaded files statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/complaints', require('./routes/complaints'));
app.use('/api/feedback', require('./routes/feedback'));

// Test route
app.get('/', (req, res) => {
  res.json({ message: 'SpeakUp Backend is running!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});