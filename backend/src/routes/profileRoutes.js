const express = require('express');
const router = express.Router();
const { updateProfile, getProfile, deleteProfile } = require('../controllers/profileController');
const { authenticateUser } = require('../middleware/authMiddleware');

// Get user profile
router.get('/', authenticateUser, getProfile);

// Update user profile
router.put('/', authenticateUser, updateProfile);

// Delete user profile
router.delete('/', authenticateUser, deleteProfile);

module.exports = router;
