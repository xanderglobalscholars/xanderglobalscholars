const mongoose = require('mongoose');

const universitySchema = new mongoose.Schema({
  name: { type: String, required: true },
  country: { type: String, required: true },
  city: { type: String, required: true },
  courses: [{ type: String }],
  createdAt: { type: Date, default: Date.now }
});

const University = mongoose.model('University', universitySchema);
module.exports = University;
