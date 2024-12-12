const mongoose = require('mongoose');

const scholarshipSchema = new mongoose.Schema({
  name: { type: String, required: true },
  amount: { type: Number, required: true },
  universityId: { type: mongoose.Schema.Types.ObjectId, ref: 'University', required: true },
  eligibility: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const Scholarship = mongoose.model('Scholarship', scholarshipSchema);
module.exports = Scholarship;
