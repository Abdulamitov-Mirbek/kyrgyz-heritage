const { body, validationResult } = require('express-validator');

// Validation error handler
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array()
    });
  }
  next();
};

// Registration validation
const validateRegistration = [
  body('username')
    .trim()
    .isLength({ min: 3, max: 30 })
    .withMessage('Username must be between 3 and 30 characters')
    .matches(/^[a-zA-Z0-9_]+$/)
    .withMessage('Username can only contain letters, numbers, and underscores'),
  
  body('email')
    .trim()
    .isEmail()
    .withMessage('Please provide a valid email')
    .normalizeEmail(),
  
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters')
    .matches(/\d/)
    .withMessage('Password must contain at least one number'),
  
  handleValidationErrors
];

// Login validation
const validateLogin = [
  body('email')
    .trim()
    .isEmail()
    .withMessage('Please provide a valid email')
    .normalizeEmail(),
  
  body('password')
    .notEmpty()
    .withMessage('Password is required'),
  
  handleValidationErrors
];

// Site validation
const validateSite = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Site name is required')
    .isLength({ max: 200 })
    .withMessage('Site name cannot exceed 200 characters'),
  
  body('description')
    .trim()
    .notEmpty()
    .withMessage('Description is required')
    .isLength({ max: 2000 })
    .withMessage('Description cannot exceed 2000 characters'),
  
  body('location.coordinates')
    .optional()
    .isArray({ min: 2, max: 2 })
    .withMessage('Coordinates must be [longitude, latitude]'),
  
  handleValidationErrors
];

// Ritual validation
const validateRitual = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Ritual name is required'),
  
  body('description')
    .trim()
    .notEmpty()
    .withMessage('Description is required'),
  
  body('site')
    .notEmpty()
    .withMessage('Site ID is required')
    .isMongoId()
    .withMessage('Invalid site ID'),
  
  handleValidationErrors
];

// Oral history validation
const validateOralHistory = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Title is required'),
  
  body('storyteller.name')
    .trim()
    .notEmpty()
    .withMessage('Storyteller name is required'),
  
  body('content.transcript')
    .trim()
    .notEmpty()
    .withMessage('Transcript is required'),
  
  body('site')
    .notEmpty()
    .withMessage('Site ID is required')
    .isMongoId()
    .withMessage('Invalid site ID'),
  
  handleValidationErrors
];

// Update profile validation
const validateProfileUpdate = [
  body('username')
    .optional()
    .trim()
    .isLength({ min: 3, max: 30 })
    .withMessage('Username must be between 3 and 30 characters')
    .matches(/^[a-zA-Z0-9_]+$/)
    .withMessage('Username can only contain letters, numbers, and underscores'),
  
  body('email')
    .optional()
    .trim()
    .isEmail()
    .withMessage('Please provide a valid email')
    .normalizeEmail(),
  
  body('bio')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Bio cannot exceed 500 characters'),
  
  handleValidationErrors
];

// Password update validation
const validatePasswordUpdate = [
  body('currentPassword')
    .notEmpty()
    .withMessage('Current password is required'),
  
  body('newPassword')
    .isLength({ min: 6 })
    .withMessage('New password must be at least 6 characters')
    .matches(/\d/)
    .withMessage('New password must contain at least one number'),
  
  handleValidationErrors
];

// ID parameter validation
const validateId = (req, res, next) => {
  const { id } = req.params;
  
  if (!id || !id.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).json({
      success: false,
      error: 'Invalid ID format'
    });
  }
  
  next();
};

// Search validation
const validateSearch = [
  body('q')
    .optional()
    .trim()
    .isLength({ min: 2 })
    .withMessage('Search query must be at least 2 characters'),
  
  handleValidationErrors
];

module.exports = {
  validateRegistration,
  validateLogin,
  validateSite,
  validateRitual,
  validateOralHistory,
  validateProfileUpdate,
  validatePasswordUpdate,
  validateId,
  validateSearch
};