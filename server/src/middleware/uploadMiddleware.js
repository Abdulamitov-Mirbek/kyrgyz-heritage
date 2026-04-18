const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const { cloudinary } = require('../config/cloudinary');
const path = require('path');

// Create different storage configurations for different file types
const imageStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'cultural-heritage/images',
    allowed_formats: ['jpg', 'jpeg', 'png', 'gif', 'webp'],
    transformation: [
      { quality: 'auto:good' },
      { fetch_format: 'auto' }
    ]
  }
});

const videoStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'cultural-heritage/videos',
    allowed_formats: ['mp4', 'mov', 'avi', 'webm'],
    resource_type: 'video'
  }
});

const audioStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'cultural-heritage/audio',
    allowed_formats: ['mp3', 'wav', 'm4a', 'ogg'],
    resource_type: 'video' // Cloudinary uses 'video' for audio too
  }
});

const documentStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'cultural-heritage/documents',
    allowed_formats: ['pdf', 'doc', 'docx', 'txt'],
    resource_type: 'raw'
  }
});

// File filter functions
const imageFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif|webp/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error('Only image files are allowed'));
  }
};

const videoFilter = (req, file, cb) => {
  const allowedTypes = /mp4|mov|avi|webm/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = file.mimetype.startsWith('video/');

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error('Only video files are allowed'));
  }
};

const audioFilter = (req, file, cb) => {
  const allowedTypes = /mp3|wav|m4a|ogg/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = file.mimetype.startsWith('audio/');

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error('Only audio files are allowed'));
  }
};

// Create multer instances
const uploadImage = multer({
  storage: imageStorage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
  fileFilter: imageFilter
});

const uploadVideo = multer({
  storage: videoStorage,
  limits: { fileSize: 100 * 1024 * 1024 }, // 100MB
  fileFilter: videoFilter
});

const uploadAudio = multer({
  storage: audioStorage,
  limits: { fileSize: 50 * 1024 * 1024 }, // 50MB
  fileFilter: audioFilter
});

const uploadDocument = multer({
  storage: documentStorage,
  limits: { fileSize: 20 * 1024 * 1024 }, // 20MB
});

// Multiple files upload
const uploadMultiple = multer({
  storage: imageStorage,
  limits: { fileSize: 10 * 1024 * 1024 }
});

// Error handling wrapper
const handleMulterError = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        success: false,
        error: 'File too large'
      });
    }
    return res.status(400).json({
      success: false,
      error: err.message
    });
  } else if (err) {
    return res.status(400).json({
      success: false,
      error: err.message
    });
  }
  next();
};

module.exports = {
  uploadImage,
  uploadVideo,
  uploadAudio,
  uploadDocument,
  uploadMultiple,
  handleMulterError
};