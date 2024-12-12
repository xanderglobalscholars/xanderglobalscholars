const Auto = require('../models/Auto'); // Ensure correct casing for file name

// Fetch all auto-related entities
exports.getAllAutos = async (req, res) => {
  try {
    const autos = await Auto.find();
    res.status(200).json({ success: true, data: autos });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Fetch a specific auto by ID
exports.getAutoById = async (req, res) => {
  try {
    const auto = await Auto.findById(req.params.id);
    if (!auto) {
      return res.status(404).json({ success: false, message: 'Auto not found' });
    }
    res.status(200).json({ success: true, data: auto });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Create a new auto entry
exports.createAuto = async (req, res) => {
  try {
    const auto = new Auto(req.body);
    await auto.save();
    res.status(201).json({ success: true, data: auto });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update an existing auto entry
exports.updateAuto = async (req, res) => {
  try {
    const auto = await Auto.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!auto) {
      return res.status(404).json({ success: false, message: 'Auto not found' });
    }
    res.status(200).json({ success: true, data: auto });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete an auto entry
exports.deleteAuto = async (req, res) => {
  try {
    const auto = await Auto.findByIdAndDelete(req.params.id);
    if (!auto) {
      return res.status(404).json({ success: false, message: 'Auto not found' });
    }
    res.status(200).json({ success: true, message: 'Auto deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
