const express = require("express");
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
  getSiteStats,
  // Import the new sacred methods
  getSacredPlaces,
  getSacredPlace,
  getSacredPlacesByType,
  getSacredStats,
} = require("../controllers/siteController");

const { protect, optionalAuth } = require("../middleware/authMiddleware");
const { uploadMultiple } = require("../middleware/uploadMiddleware");

// Public routes with optional authentication
router.get("/", optionalAuth, getSites);
router.get("/search", optionalAuth, searchSites);
router.get("/nearby", optionalAuth, getNearbySites);
router.get("/stats", getSiteStats);

// ============================================
// SACRED PLACES ROUTES (Add these)
// ============================================
router.get("/sacred", optionalAuth, getSacredPlaces);
router.get("/sacred/stats", getSacredStats);
router.get("/sacred/type/:type", optionalAuth, getSacredPlacesByType);
router.get("/sacred/:id", optionalAuth, getSacredPlace);
// ============================================

// Regular site routes (must come after specific routes)
router.get("/:id", optionalAuth, getSite);

// Protected routes
router.use(protect);
router.post("/", createSite);
router.put("/:id", updateSite);
router.delete("/:id", deleteSite);

// Media routes
router.post("/:id/images", uploadMultiple.array("images", 10), addImage);
router.post("/:id/rituals", addRitual);
router.post("/:id/oral-histories", addOralHistory);

module.exports = router;
