const Scholarship = require('../models/Scholarship');

// Add scholarship
exports.addScholarship = async (req, res) => {
  try {
    const { name, amount, universityId, eligibility } = req.body;
    const newScholarship = new Scholarship({ name, amount, universityId, eligibility });

    await newScholarship.save();
    res.status(201).json({ message: 'Scholarship added successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all scholarships
exports.getAllScholarships = async (req, res) => {
  try {
    const scholarships = await Scholarship.find();
    res.status(200).json(scholarships);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get scholarship by ID
exports.getScholarshipById = async (req, res) => {
  try {
    const scholarship = await Scholarship.findById(req.params.id);
    res.status(200).json(scholarship);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
