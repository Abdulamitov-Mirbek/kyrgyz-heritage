const Site = require("../models/Site");
const Image = require("../models/Image");
const Ritual = require("../models/Ritual");
const OralHistory = require("../models/OralHistory");

// ============================================
// BASIC CRUD OPERATIONS
// ============================================

// Create site
// Create site
const createSite = async (req, res) => {
  try {
    const site = await Site.create({
      ...req.body,
      createdBy: req.user.id,
      isVerified: true, // Auto-verify for hackathon
      verificationStatus: "approved",
    });

    res.status(201).json({
      success: true,
      data: site,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

// Get all sites
const getSites = async (req, res) => {
  try {
    const sites = await Site.find({ isVerified: true })
      .populate("images", "url")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: sites.length,
      data: sites,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

// Get single site
const getSite = async (req, res) => {
  try {
    const site = await Site.findById(req.params.id)
      .populate("images")
      .populate("rituals")
      .populate("oralHistories")
      .populate("createdBy", "username");

    if (!site) {
      return res.status(404).json({
        success: false,
        error: "Site not found",
      });
    }

    site.viewCount += 1;
    await site.save();

    res.json({
      success: true,
      data: site,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

// Update site
const updateSite = async (req, res) => {
  try {
    let site = await Site.findById(req.params.id);

    if (!site) {
      return res.status(404).json({
        success: false,
        error: "Site not found",
      });
    }

    if (
      site.createdBy.toString() !== req.user.id &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({
        success: false,
        error: "Not authorized",
      });
    }

    site = await Site.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.json({
      success: true,
      data: site,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

// Delete site
const deleteSite = async (req, res) => {
  try {
    const site = await Site.findById(req.params.id);

    if (!site) {
      return res.status(404).json({
        success: false,
        error: "Site not found",
      });
    }

    if (
      site.createdBy.toString() !== req.user.id &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({
        success: false,
        error: "Not authorized",
      });
    }

    await site.deleteOne();

    res.json({
      success: true,
      message: "Site deleted successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

// Get nearby sites
const getNearbySites = async (req, res) => {
  try {
    const { lng, lat, distance = 10 } = req.query;

    if (!lng || !lat) {
      return res.status(400).json({
        success: false,
        error: "Please provide longitude and latitude",
      });
    }

    const sites = await Site.find({
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [parseFloat(lng), parseFloat(lat)],
          },
          $maxDistance: distance * 1000,
        },
      },
      isVerified: true,
    });

    res.json({
      success: true,
      count: sites.length,
      data: sites,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

// Search sites
const searchSites = async (req, res) => {
  try {
    const { q } = req.query;

    const sites = await Site.find({
      $text: { $search: q },
      isVerified: true,
    }).limit(20);

    res.json({
      success: true,
      count: sites.length,
      data: sites,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

// Add image to site
const addImage = async (req, res) => {
  res.json({
    success: true,
    message: "Image upload endpoint - implement with Cloudinary",
  });
};

// Add ritual to site
const addRitual = async (req, res) => {
  try {
    const ritual = await Ritual.create({
      ...req.body,
      site: req.params.id,
      createdBy: req.user.id,
    });

    await Site.findByIdAndUpdate(req.params.id, {
      $push: { rituals: ritual._id },
    });

    res.status(201).json({
      success: true,
      data: ritual,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

// Add oral history
const addOralHistory = async (req, res) => {
  try {
    const oralHistory = await OralHistory.create({
      ...req.body,
      site: req.params.id,
      createdBy: req.user.id,
    });

    await Site.findByIdAndUpdate(req.params.id, {
      $push: { oralHistories: oralHistory._id },
    });

    res.status(201).json({
      success: true,
      data: oralHistory,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

// Get site stats
const getSiteStats = async (req, res) => {
  try {
    const site = await Site.findById(req.params.id);

    if (!site) {
      return res.status(404).json({
        success: false,
        error: "Site not found",
      });
    }

    res.json({
      success: true,
      data: {
        viewCount: site.viewCount || 0,
        imageCount: site.images?.length || 0,
        ritualCount: site.rituals?.length || 0,
        oralHistoryCount: site.oralHistories?.length || 0,
      },
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

// ============================================
// SACRED PLACES METHODS
// ============================================

// Get all sacred places
const getSacredPlaces = async (req, res) => {
  try {
    const { lng, lat, distance = 100 } = req.query;

    let query = {
      $or: [
        { siteType: "sacred" },
        { sacredType: { $exists: true } },
        { spiritualSignificance: { $exists: true } },
      ],
      isVerified: true,
    };

    if (lng && lat) {
      query.location = {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [parseFloat(lng), parseFloat(lat)],
          },
          $maxDistance: distance * 1000,
        },
      };
    }

    const sacredPlaces = await Site.find(query)
      .populate("images", "url thumbnailUrl")
      .select(
        "name description location sacredType spiritualSignificance legends healingProperties images viewCount siteType",
      )
      .limit(50);

    res.json({
      success: true,
      count: sacredPlaces.length,
      data: sacredPlaces,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

// Get single sacred place
const getSacredPlace = async (req, res) => {
  try {
    const site = await Site.findOne({
      _id: req.params.id,
      $or: [{ siteType: "sacred" }, { sacredType: { $exists: true } }],
      isVerified: true,
    })
      .populate("images")
      .populate("rituals")
      .populate("oralHistories")
      .populate("createdBy", "username");

    if (!site) {
      return res.status(404).json({
        success: false,
        error: "Sacred place not found",
      });
    }

    site.viewCount += 1;
    await site.save();

    res.json({
      success: true,
      data: site,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

// Get sacred places by type
const getSacredPlacesByType = async (req, res) => {
  try {
    const { type } = req.params;

    const sacredPlaces = await Site.find({
      sacredType: type,
      isVerified: true,
    })
      .populate("images", "url")
      .select(
        "name description location sacredType spiritualSignificance images viewCount",
      )
      .limit(30);

    res.json({
      success: true,
      count: sacredPlaces.length,
      data: sacredPlaces,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

// Get sacred places statistics
const getSacredStats = async (req, res) => {
  try {
    const stats = await Site.aggregate([
      {
        $match: {
          $or: [{ siteType: "sacred" }, { sacredType: { $exists: true } }],
          isVerified: true,
        },
      },
      {
        $group: {
          _id: "$sacredType",
          count: { $sum: 1 },
        },
      },
    ]);

    const total = await Site.countDocuments({
      $or: [{ siteType: "sacred" }, { sacredType: { $exists: true } }],
      isVerified: true,
    });

    res.json({
      success: true,
      data: {
        total,
        byType: stats,
      },
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

// ============================================
// EXPORT ALL FUNCTIONS
// ============================================

module.exports = {
  // Basic CRUD
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

  // Sacred places
  getSacredPlaces,
  getSacredPlace,
  getSacredPlacesByType,
  getSacredStats,
};
