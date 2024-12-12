const express = require('express');
const { applyLoan, viewLoan, repayLoan } = require('../controllers/loanController');
const router = express.Router();

// Public routes
router.post('/apply', applyLoan);
router.get('/:id', viewLoan);

// Protected routes
router.post('/repay', repayLoan);

module.exports = router;
