const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema({
  student: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  
  type: { type: String, required: true },           // Fake Account, Cyberbullying, etc.
  platform: { type: String, required: true },       // Facebook, Instagram, etc.
  description: { type: String, required: true },
  date: { type: Date, default: Date.now },
  
  evidence: { type: String },                       // filename e.g. "screenshot123.jpg"
  
  status: { 
    type: String, 
    enum: ['Submitted', 'Reviewed', 'Action Required', 'Resolved'],
    default: 'Submitted'
  },
  
  adminNote: { type: String, default: '' },
  
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Complaint', complaintSchema);