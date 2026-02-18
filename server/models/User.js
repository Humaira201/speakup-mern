const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  
  role: { 
    type: String, 
    enum: ['student', 'admin'], 
    default: 'student' 
  },
  
  studentID: { 
    type: String, 
    required: function() { return this.role === 'student'; } 
  },
  
  adminID: { 
    type: String, 
    required: function() { return this.role === 'admin'; } 
  },
  
  anonymousName: { type: String },   // optional for students
  
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);