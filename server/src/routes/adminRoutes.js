const express = require('express');
const router = express.Router();
const {
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  getSubmissions,
  reviewSubmission,
  getStats,
  getPendingSites,
  approveSite,
  rejectSite,
  getSystemLogs
} = require('../controllers/adminController');

const { protect, authorize } = require('../middleware/authMiddleware');

// All admin routes require authentication and admin role
router.use(protect);
router.use(authorize('admin'));

// User management
router.get('/users', getUsers);
router.get('/users/:id', getUser);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);

// Submission management
router.get('/submissions', getSubmissions);
router.put('/submissions/:id/review', reviewSubmission);

// Site approval
router.get('/sites/pending', getPendingSites);
router.put('/sites/:id/approve', approveSite);
router.put('/sites/:id/reject', rejectSite);

// System stats and logs
router.get('/stats', getStats);
router.get('/logs', getSystemLogs);

module.exports = router;