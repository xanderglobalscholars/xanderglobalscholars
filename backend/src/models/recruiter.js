const mongoose = require('mongoose');

const RecruiterSchema = new mongoose.Schema(
  {
    recruiterId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    jobListings: [
      {
        title: { type: String, required: true },
        description: { type: String, required: true },
        location: { type: String, required: true },
        requirements: [{ type: String, required: true }],
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Recruiter', RecruiterSchema);
