const Site = require("../models/Site");
const Image = require("../models/Image");
const Ritual = require("../models/Ritual");
const OralHistory = require("../models/OralHistory");

// Create site
const createSite = async (req, res) => {
  try {
    const site = await Site.create({
      ...req.body,
      createdBy: req.user.id,
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

    res.json({
      success: true,
      data: {
        viewCount: site.viewCount,
        imageCount: site.images.length,
        ritualCount: site.rituals.length,
        oralHistoryCount: site.oralHistories.length,
      },
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

module.exports = {
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
};
