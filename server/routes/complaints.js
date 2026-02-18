const express = require('express');
const router = express.Router();
const { 
  upload, 
  createComplaint, 
  getMyComplaints, 
  getAllComplaints, 
  updateComplaint 
} = require('../controllers/complaintController');

const { protect, adminOnly } = require('../middleware/auth');

// Student routes
router.post('/', protect, upload.single('evidence'), createComplaint);
router.get('/my', protect, getMyComplaints);

// Admin routes
router.get('/', protect, adminOnly, getAllComplaints);
router.put('/:id', protect, adminOnly, updateComplaint);

module.exports = router;