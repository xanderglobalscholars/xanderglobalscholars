const Application = require('../models/Application');

// Create a new application
exports.createApplication = async (req, res) => {
  try {
    const { studentId, universityId } = req.body;
    const newApplication = new Application({ studentId, universityId });
    await newApplication.save();
    res.status(201).json({ message: 'Application created successfully', application: newApplication });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all applications
exports.getAllApplications = async (req, res) => {
  try {
    const applications = await Application.find().populate('studentId universityId');
    res.status(200).json(applications);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update application status
exports.updateApplicationStatus = async (req, res) => {
  try {
    const { applicationId, status } = req.body;
    const updatedApplication = await Application.findByIdAndUpdate(applicationId, { status }, { new: true });
    res.status(200).json(updatedApplication);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
