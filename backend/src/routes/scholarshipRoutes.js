const express = require('express');
const { addScholarship, getAllScholarships, getScholarshipById } = require('../controllers/scholarshipController');
const router = express.Router();

// Public routes
router.post('/', addScholarship);
router.get('/', getAllScholarships);
router.get('/:id', getScholarshipById);

module.exports = router;
