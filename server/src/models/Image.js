const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide image title'],
    trim: true,
    maxlength: [200, 'Title cannot be more than 200 characters']
  },
  description: {
    type: String,
    maxlength: [1000, 'Description cannot be more than 1000 characters']
  },
  url: {
    type: String,
    required: [true, 'Please provide image URL']
  },
  thumbnailUrl: String,
  publicId: {
    type: String,
    required: true
  },
  site: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Site',
    required: true
  },
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  metadata: {
    size: Number,
    format: String,
    width: Number,
    height: Number,
    capturedAt: Date,
    device: String
  },
  aiRestoration: {
    isRestored: {
      type: Boolean,
      default: false
    },
    originalUrl: String,
    restoredUrl: String,
    restorationDate: Date,
    enhancementDetails: {
      type: Map,
      of: String
    }
  },
  tags: [String],
  isPrimary: {
    type: Boolean,
    default: false
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  viewCount: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Image', imageSchema);