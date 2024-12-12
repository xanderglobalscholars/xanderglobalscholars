const express = require('express');
const { addPostgradService, getAllPostgradServices, getPostgradServiceById } = require('../controllers/postgradServiceController');
const router = express.Router();

// Public routes
router.post('/', addPostgradService);
router.get('/', getAllPostgradServices);
router.get('/:id', getPostgradServiceById);

module.exports = router;
