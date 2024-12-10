const mongoose = require('mongoose');

const loanSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  loanAmount: { type: Number, required: true },
  repaymentStatus: { type: String, default: 'pending' }, // e.g., "pending", "ongoing", "completed"
  repaymentDate: { type: Date }, // Optional field for when repayment is due
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Loan', loanSchema);
