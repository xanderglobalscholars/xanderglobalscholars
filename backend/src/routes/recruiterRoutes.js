const express = require('express');
const router = express.Router();
const recruiterController = require('../controllers/recruiterController');

router.get('/', recruiterController.getAllRecruiters);
router.get('/:id', recruiterController.getRecruiterById);
router.post('/', recruiterController.createRecruiter);
router.put('/:id', recruiterController.updateRecruiter);
router.delete('/:id', recruiterController.deleteRecruiter);

module.exports = router;
