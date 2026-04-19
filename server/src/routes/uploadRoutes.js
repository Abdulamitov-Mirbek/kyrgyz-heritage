const express = require('express');
const router = express.Router();
const {
  uploadSingleImage,
  uploadMultipleImages,
  uploadVideo,
  uploadAudio,
  uploadDocument,
  deleteFile,
  restoreImage
} = require('../controllers/uploadController');

const { protect } = require('../middleware/authMiddleware');
const {
  uploadImage,
  uploadVideo: videoUpload,
  uploadAudio: audioUpload,
  uploadDocument: docUpload,
  uploadMultiple,
  handleMulterError
} = require('../middleware/uploadMiddleware');

// All upload routes require authentication
router.use(protect);

// Image uploads
router.post(
  '/image',
  uploadImage.single('image'),
  handleMulterError,
  uploadSingleImage
);

router.post(
  '/images',
  uploadMultiple.array('images', 10),
  handleMulterError,
  uploadMultipleImages
);

// Video upload
router.post(
  '/video',
  videoUpload.single('video'),
  handleMulterError,
  uploadVideo
);

// Audio upload
router.post(
  '/audio',
  audioUpload.single('audio'),
  handleMulterError,
  uploadAudio
);

// Document upload
router.post(
  '/document',
  docUpload.single('document'),
  handleMulterError,
  uploadDocument
);

// File management
router.delete('/:publicId', deleteFile);
router.post('/restore', restoreImage);

module.exports = router;