const mongoose = require('mongoose');

const repaymentSchema = new mongoose.Schema({
  paymentDate: { type: Date, required: true },
  amountPaid: { type: Number, required: true },
  remainingBalance: { type: Number, required: true }
});

const loanSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: Number, required: true },
  interestRate: { type: Number, required: true },
  repaymentPeriod: { type: Number, required: true }, // in months
  status: { type: String, enum: ['approved', 'pending', 'rejected'], default: 'pending' },
  repayments: [repaymentSchema],
  createdAt: { type: Date, default: Date.now }
});

const Loan = mongoose.model('Loan', loanSchema);
module.exports = Loan;
