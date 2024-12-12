const mongoose = require('mongoose');

const postgradServiceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  universityId: { type: mongoose.Schema.Types.ObjectId, ref: 'University', required: true },
  createdAt: { type: Date, default: Date.now }
});

const PostgradService = mongoose.model('PostgradService', postgradServiceSchema);
module.exports = PostgradService;
