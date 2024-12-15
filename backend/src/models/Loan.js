const mongoose = require('mongoose');

const LoanSchema = new mongoose.Schema(
  {
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
    amount: { type: Number, required: true, min: 0 },
    interestRate: { type: Number, required: true, min: 0 },
    repaymentInfo: {
      installments: [
        {
          amount: { type: Number, required: true, min: 0 },
          dueDate: { type: Date, required: true },
          status: { type: String, enum: ['pending', 'paid'], default: 'pending' },
        },
      ],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Loan', LoanSchema);
