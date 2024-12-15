const mongoose = require('mongoose');

const PostgraduateSchema = new mongoose.Schema(
  {
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
    serviceType: { type: String, required: true }, // Example: "Job Placement", "Alumni Networking"
    details: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Postgraduate', PostgraduateSchema);
