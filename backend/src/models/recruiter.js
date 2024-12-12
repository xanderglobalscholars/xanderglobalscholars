const mongoose = require('mongoose');

// Recruiter schema to define recruiter-specific details
const RecruiterSchema = new mongoose.Schema({
  recruiterId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  jobListings: [{
    title: { type: String, required: true },
    description: { type: String, required: true },
    location: { type: String, required: true },
    requirements: [{ type: String, required: true }],
    createdAt: { type: Date, default: Date.now },
  }],
});

module.exports = mongoose.model('Recruiter', RecruiterSchema);
