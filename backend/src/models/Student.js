const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    courses: [{ type: String }], // List of enrolled courses
    scholarships: [{ type: String }], // Scholarships received
    loanHistory: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Loan' }], // Loans linked to the student
  },
  { timestamps: true }
);

module.exports = mongoose.model('Student', studentSchema);
