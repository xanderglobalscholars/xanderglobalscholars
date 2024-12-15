const mongoose = require('mongoose');

const UniversitySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    country: { type: String, required: true },
    city: { type: String, required: true },
    courses: [{ type: String }],
  },
  { timestamps: true }
);

module.exports = mongoose.model('University', UniversitySchema);
