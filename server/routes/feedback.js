const express = require('express');
const router = express.Router();
const { submitFeedback, getAllFeedback } = require('../controllers/feedbackController');
const { protect, adminOnly } = require('../middleware/auth');

router.post('/', protect, submitFeedback);
router.get('/', protect, adminOnly, getAllFeedback);

module.exports = router;