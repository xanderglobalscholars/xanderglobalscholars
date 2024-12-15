const mongoose = require('mongoose');

const ApplicationSchema = new mongoose.Schema(
  {
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
    universityId: { type: mongoose.Schema.Types.ObjectId, ref: 'University', required: true },
    status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Application', ApplicationSchema);
