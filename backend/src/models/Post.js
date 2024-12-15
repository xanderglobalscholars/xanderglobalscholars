const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema(
  {
    title: { 
      type: String, 
      required: true, 
      trim: true 
    },
    content: { 
      type: String, 
      required: true 
    },
    author: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User', 
      required: true 
    }, // Reference to User model
    category: { 
      type: String, 
      enum: ['news', 'blog', 'announcement', 'event'], 
      default: 'blog' 
    },
    attachments: [
      {
        url: { type: String },
        type: { type: String, enum: ['image', 'video', 'document'] },
      },
    ], // Attachments for images, videos, or documents
    tags: [String], // Array of tags for search optimization
    views: { 
      type: Number, 
      default: 0 
    },
    likes: [
      { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    ], // Array of user IDs who liked the post
    status: { 
      type: String, 
      enum: ['draft', 'published', 'archived'], 
      default: 'draft' 
    }, // Post status
  },
  { timestamps: true } // Automatically manage createdAt and updatedAt fields
);

module.exports = mongoose.model('Post', PostSchema);
