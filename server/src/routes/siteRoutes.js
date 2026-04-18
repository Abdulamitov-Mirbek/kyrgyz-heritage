const express = require('express');
const router = express.Router();
const {
  createSite,
  getSites,
  getSite,
  updateSite,
  deleteSite,
  getNearbySites,
  searchSites,
  addImage,
  addRitual,
  addOralHistory,
  getSiteStats
} = require('../controllers/siteController');

const { protect, authorize, optionalAuth } = require('../middleware/authMiddleware');
const { uploadMultiple } = require('../middleware/uploadMiddleware');

// Public routes with optional authentication
router.get('/', optionalAuth, getSites);
router.get('/search', optionalAuth, searchSites);
router.get('/nearby', optionalAuth, getNearbySites);
router.get('/:id', optionalAuth, getSite);
router.get('/:id/stats', getSiteStats);

// Protected routes
router.use(protect);
router.post('/', createSite);
router.put('/:id', updateSite);
router.delete('/:id', deleteSite);

// Media routes
router.post('/:id/images', uploadMultiple.array('images', 10), addImage);
router.post('/:id/rituals', addRitual);
router.post('/:id/oral-histories', addOralHistory);

module.exports = router;