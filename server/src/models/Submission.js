const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['site', 'image', 'ritual', 'oralHistory', 'edit'],
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'under_review', 'approved', 'rejected', 'needs_revision'],
    default: 'pending'
  },
  submittedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  reviewedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  data: {
    type: mongoose.Schema.Types.Mixed,
    required: true
  },
  targetId: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: 'type'
  },
  changes: {
    type: Map,
    of: mongoose.Schema.Types.Mixed
  },
  reviewNotes: [{
    reviewer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    note: String,
    date: {
      type: Date,
      default: Date.now
    }
  }],
  attachments: [{
    url: String,
    publicId: String,
    type: String
  }],
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'medium'
  }
}, {
  timestamps: true
});

// Index for efficient querying
submissionSchema.index({ status: 1, createdAt: -1 });
submissionSchema.index({ submittedBy: 1, status: 1 });

module.exports = mongoose.model('Submission', submissionSchema);