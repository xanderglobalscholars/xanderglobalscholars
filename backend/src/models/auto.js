const mongoose = require('mongoose');

// Define Auto schema
const autoSchema = new mongoose.Schema({
  make: { type: String, required: true },
  model: { type: String, required: true },
  year: { type: Number, required: true },
  price: { type: Number, required: true },
  color: { type: String },
  createdAt: { type: Date, default: Date.now }
});

// Create the Auto model
const Auto = mongoose.model('Auto', autoSchema);

module.exports = Auto;
