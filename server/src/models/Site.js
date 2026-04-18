const mongoose = require('mongoose');

const siteSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide site name'],
    trim: true,
    maxlength: [200, 'Site name cannot be more than 200 characters']
  },
  description: {
    type: String,
    required: [true, 'Please provide site description'],
    maxlength: [2000, 'Description cannot be more than 2000 characters']
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point'
    },
    coordinates: {
      type: [Number],
      required: true,
      validate: {
        validator: function(v) {
          return v.length === 2 && 
                 v[0] >= -180 && v[0] <= 180 && 
                 v[1] >= -90 && v[1] <= 90;
        },
        message: 'Invalid coordinates'
      }
    },
    address: String,
    city: String,
    region: String,
    country: String
  },
  culturalPeriod: {
    type: String,
    enum: ['Ancient', 'Medieval', 'Colonial', 'Modern', 'Contemporary', 'Prehistoric', 'Unknown'],
    default: 'Unknown'
  },
  heritageStatus: {
    type: String,
    enum: ['UNESCO', 'National', 'Regional', 'Local', 'Unprotected', 'Endangered'],
    default: 'Local'
  },
  images: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Image'
  }],
  rituals: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Ritual'
  }],
  oralHistories: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'OralHistory'
  }],
  tags: [{
    type: String,
    trim: true
  }],
  accessibility: {
    type: String,
    enum: ['Public', 'Restricted', 'Private', 'Unknown'],
    default: 'Unknown'
  },
  visitingHours: String,
  contactInfo: {
    phone: String,
    email: String,
    website: String
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  contributors: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  isVerified: {
    type: Boolean,
    default: false
  },
  verificationStatus: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  viewCount: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Create geospatial index for location-based queries
siteSchema.index({ location: '2dsphere' });

// Text index for search functionality
siteSchema.index({ 
  name: 'text', 
  description: 'text', 
  'location.address': 'text',
  tags: 'text' 
});

module.exports = mongoose.model('Site', siteSchema);