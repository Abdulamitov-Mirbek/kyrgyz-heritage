const express = require("express");
const router = express.Router();
const {
  register,
  login,
  getMe,
  updateProfile,
  updatePassword,
} = require("../controllers/authController");

const { protect } = require("../middleware/authMiddleware");
const {
  validateRegistration,
  validateLogin,
  validateProfileUpdate,
  validatePasswordUpdate,
} = require("../middleware/validationMiddleware");

// Public routes
router.post("/register", validateRegistration, register);
router.post("/login", validateLogin, login);

// Protected routes
router.use(protect);
router.get("/me", getMe);
router.put("/profile", validateProfileUpdate, updateProfile);
router.put("/password", validatePasswordUpdate, updatePassword);

module.exports = router;
