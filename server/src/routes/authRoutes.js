const express = require('express');
const router = express.Router();
const {
  register,
  login,
  getMe,
  updateProfile,
  updatePassword
} = require('../controllers/authController');

const { protect } = require('../middleware/authMiddleware');
const { 
  validateRegistration, 
  validateLogin 
} = require('../middleware/validationMiddleware');

// Public routes
router.post('/register', validateRegistration, register);
router.post('/login', validateLogin, login);

// Protected routes
router.use(protect);
router.get('/me', getMe);
router.put('/profile', updateProfile);
router.put('/password', updatePassword);

module.exports = router;