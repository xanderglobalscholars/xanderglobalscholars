const express = require('express');
const { addUniversity, getAllUniversities, getUniversityById, updateUniversity, deleteUniversity } = require('../controllers/universityController');
const router = express.Router();

// Public routes
router.post('/', addUniversity);
router.get('/', getAllUniversities);
router.get('/:id', getUniversityById);
router.put('/:id', updateUniversity);
router.delete('/:id', deleteUniversity);

module.exports = router;
