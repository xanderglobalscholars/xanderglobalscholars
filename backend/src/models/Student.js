const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    courses: [{ type: String }], // List of enrolled courses
    scholarships: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Scholarship' }], // Scholarships received
    loanHistory: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Loan' }], // Loans linked to the student
  },
  { timestamps: true }
);

module.exports = mongoose.model('Student', StudentSchema);
