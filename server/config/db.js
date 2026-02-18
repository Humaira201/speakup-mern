// server/config/db.js
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      // These options are usually not needed in 2024-2025 but safe to keep:
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
    });
    
    console.log('MongoDB connected successfully ✅');
  } catch (err) {
    console.error('MongoDB connection error ❌:', err.message);
    // Optional: exit process if connection fails (good for development)
    process.exit(1);
  }
};

module.exports = connectDB;