const Recruiter = require('../models/Recruiter'); // Ensure correct casing for file name

// Fetch all recruiters
exports.getAllRecruiters = async (req, res) => {
  try {
    const recruiters = await Recruiter.find();
    res.status(200).json({ success: true, data: recruiters });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Fetch a recruiter by ID
exports.getRecruiterById = async (req, res) => {
  try {
    const recruiter = await Recruiter.findById(req.params.id);
    if (!recruiter) {
      return res.status(404).json({ success: false, message: 'Recruiter not found' });
    }
    res.status(200).json({ success: true, data: recruiter });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Create a new recruiter
exports.createRecruiter = async (req, res) => {
  try {
    const recruiter = new Recruiter(req.body);
    await recruiter.save();
    res.status(201).json({ success: true, data: recruiter });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update an existing recruiter
exports.updateRecruiter = async (req, res) => {
  try {
    const recruiter = await Recruiter.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!recruiter) {
      return res.status(404).json({ success: false, message: 'Recruiter not found' });
    }
    res.status(200).json({ success: true, data: recruiter });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete a recruiter
exports.deleteRecruiter = async (req, res) => {
  try {
    const recruiter = await Recruiter.findByIdAndDelete(req.params.id);
    if (!recruiter) {
      return res.status(404).json({ success: false, message: 'Recruiter not found' });
    }
    res.status(200).json({ success: true, message: 'Recruiter deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
