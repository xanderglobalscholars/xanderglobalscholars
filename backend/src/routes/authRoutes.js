const express = require('express');
const { protect, authorizeRoles } = require('../middleware/authMiddleware');
const { autoFunction1, autoFunction2 } = require('../controllers/autoController');

const router = express.Router();

// Protect all routes
router.use(protect);

// Example: Protected route, accessible to all authenticated users
router.get('/view', autoFunction1);

// Example: Route restricted to admins only
router.post('/admin-action', authorizeRoles('admin'), autoFunction2);

module.exports = router;
