const mongoose = require('mongoose');

const AutoSchema = new mongoose.Schema(
  {
    make: { type: String, required: true },
    model: { type: String, required: true },
    year: { type: Number, required: true, min: 1886 }, // Cars weren't invented before 1886
    price: { type: Number, required: true, min: 0 },
    color: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Auto', AutoSchema);
