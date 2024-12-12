const express = require('express');
const router = express.Router();
const autoController = require('../controllers/autoController');

router.get('/', autoController.getAllAutos);
router.get('/:id', autoController.getAutoById);
router.post('/', autoController.createAuto);
router.put('/:id', autoController.updateAuto);
router.delete('/:id', autoController.deleteAuto);

module.exports = router;
