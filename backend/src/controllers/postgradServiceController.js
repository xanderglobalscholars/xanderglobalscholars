const PostgradService = require('../models/PostgradService');

// Add post-graduate service
exports.addPostgradService = async (req, res) => {
  try {
    const { name, description, universityId } = req.body;
    const newPostgradService = new PostgradService({ name, description, universityId });

    await newPostgradService.save();
    res.status(201).json({ message: 'Post-graduate service added successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all post-graduate services
exports.getAllPostgradServices = async (req, res) => {
  try {
    const postgradServices = await PostgradService.find();
    res.status(200).json(postgradServices);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get post-graduate service by ID
exports.getPostgradServiceById = async (req, res) => {
  try {
    const postgradService = await PostgradService.findById(req.params.id);
    res.status(200).json(postgradService);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
