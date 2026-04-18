const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Create storage for different types of uploads
const createStorage = (folder) => {
  return new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: `cultural-heritage/${folder}`,
      allowed_formats: ['jpg', 'jpeg', 'png', 'gif', 'mp4', 'mp3', 'wav', 'webm'],
      transformation: folder === 'images' ? [
        { quality: 'auto:good' },
        { fetch_format: 'auto' }
      ] : []
    }
  });
};

// Upload helper function
const uploadToCloudinary = async (file, folder) => {
  try {
    const result = await cloudinary.uploader.upload(file, {
      folder: `cultural-heritage/${folder}`,
      resource_type: 'auto'
    });
    return result;
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    throw new Error('Failed to upload file to cloud storage');
  }
};

// Delete helper function
const deleteFromCloudinary = async (publicId) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return result;
  } catch (error) {
    console.error('Cloudinary delete error:', error);
    throw new Error('Failed to delete file from cloud storage');
  }
};

module.exports = {
  cloudinary,
  createStorage,
  uploadToCloudinary,
  deleteFromCloudinary
};