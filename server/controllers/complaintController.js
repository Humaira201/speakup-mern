const Complaint = require('../models/Complaint');
const multer = require('multer');
const path = require('path');

// Multer setup for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

// Create Complaint (Student Complaint Form)
const createComplaint = async (req, res) => {
  try {
    const { type, platform, description, date } = req.body;
    
    const complaint = await Complaint.create({
      student: req.user.id,
      type,
      platform,
      description,
      date: date || Date.now(),
      evidence: req.file ? req.file.filename : null
    });

    res.status(201).json(complaint);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get My Complaints (Student)
const getMyComplaints = async (req, res) => {
  const complaints = await Complaint.find({ student: req.user.id })
    .sort({ createdAt: -1 });
  res.json(complaints);
};

// Get All Complaints (Admin Dashboard)
const getAllComplaints = async (req, res) => {
  const complaints = await Complaint.find()
    .populate('student', 'name email studentID anonymousName')
    .sort({ createdAt: -1 });
  res.json(complaints);
};

// Update Complaint (Admin - status + note)
const updateComplaint = async (req, res) => {
  const { status, adminNote } = req.body;
  
  const complaint = await Complaint.findById(req.params.id);
  
  if (!complaint) return res.status(404).json({ message: 'Complaint not found' });

  complaint.status = status || complaint.status;
  complaint.adminNote = adminNote || complaint.adminNote;

  const updated = await complaint.save();
  res.json(updated);
};

module.exports = {
  upload,
  createComplaint,
  getMyComplaints,
  getAllComplaints,
  updateComplaint
};