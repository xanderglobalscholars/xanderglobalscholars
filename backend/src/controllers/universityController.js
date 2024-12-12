const University = require('../models/University');

// Add university
exports.addUniversity = async (req, res) => {
  try {
    const { name, country, city, courses } = req.body;
    const newUniversity = new University({ name, country, city, courses });

    await newUniversity.save();
    res.status(201).json({ message: 'University added successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all universities
exports.getAllUniversities = async (req, res) => {
  try {
    const universities = await University.find();
    res.status(200).json(universities);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get university by ID
exports.getUniversityById = async (req, res) => {
  try {
    const university = await University.findById(req.params.id);
    res.status(200).json(university);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update university
exports.updateUniversity = async (req, res) => {
  try {
    const { name, country, city, courses } = req.body;
    const updatedUniversity = await University.findByIdAndUpdate(req.params.id, { name, country, city, courses }, { new: true });
    res.status(200).json(updatedUniversity);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete university
exports.deleteUniversity = async (req, res) => {
  try {
    await University.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'University deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
