const mongoose = require('mongoose');

const ritualSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide ritual name'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Please provide ritual description'],
    maxlength: [3000, 'Description cannot be more than 3000 characters']
  },
  site: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Site',
    required: true
  },
  type: {
    type: String,
    enum: ['Religious', 'Cultural', 'Festival', 'Ceremony', 'Dance', 'Music', 'Other'],
    default: 'Cultural'
  },
  frequency: {
    type: String,
    enum: ['Daily', 'Weekly', 'Monthly', 'Annual', 'Occasional', 'Historical'],
    default: 'Occasional'
  },
  participants: {
    type: String,
    enum: ['Individual', 'Family', 'Community', 'Religious Group', 'Public'],
    default: 'Community'
  },
  duration: {
    value: Number,
    unit: {
      type: String,
      enum: ['minutes', 'hours', 'days', 'weeks']
    }
  },
  materials: [{
    name: String,
    description: String,
    significance: String
  }],
  steps: [{
    order: Number,
    name: String,
    description: String,
    duration: String
  }],
  media: [{
    type: {
      type: String,
      enum: ['image', 'video', 'audio']
    },
    url: String,
    publicId: String,
    title: String,
    description: String
  }],
  practitioners: [{
    name: String,
    role: String,
    contact: String
  }],
  culturalSignificance: {
    type: String,
    maxlength: [1000, 'Cultural significance cannot exceed 1000 characters']
  },
  restrictions: {
    type: String,
    maxlength: [500, 'Restrictions cannot exceed 500 characters']
  },
  seasonality: {
    months: [{
      type: Number,
      min: 1,
      max: 12
    }],
    description: String
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  isVerified: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Ritual', ritualSchema);