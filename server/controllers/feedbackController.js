const Feedback = require('../models/Feedback');

const submitFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.create({
      user: req.user.id,
      message: req.body.message
    });
    res.status(201).json(feedback);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllFeedback = async (req, res) => {
  const feedback = await Feedback.find().populate('user', 'name email');
  res.json(feedback);
};

module.exports = { submitFeedback, getAllFeedback };