const mongoose = require('mongoose');

const ScholarshipSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    amount: { type: Number, required: true, min: 0 },
    universityId: { type: mongoose.Schema.Types.ObjectId, ref: 'University', required: true },
    eligibility: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Scholarship', ScholarshipSchema);
