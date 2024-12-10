const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  scholarshipId: { type: mongoose.Schema.Types.ObjectId, ref: 'Scholarship', required: true },
  status: { type: String, default: 'pending' }, // e.g., "pending", "approved", "rejected"
  submittedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Application', applicationSchema);
