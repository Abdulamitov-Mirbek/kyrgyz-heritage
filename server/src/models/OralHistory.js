const mongoose = require("mongoose");

const oralHistorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide a title"],
      trim: true,
    },
    storyteller: {
      name: {
        type: String,
        required: [true, "Please provide storyteller name"],
      },
      age: Number,
      gender: String,
      community: String,
    },
    site: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Site",
      required: true,
    },
    content: {
      transcript: {
        type: String,
        required: [true, "Please provide transcript"],
      },
      summary: String,
      keywords: [String],
    },
    media: {
      audioUrl: String,
      videoUrl: String,
      duration: Number,
      language: {
        type: String,
        default: "English",
      },
    },
    themes: [
      {
        type: String,
        enum: [
          "Personal Story",
          "Historical Event",
          "Cultural Practice",
          "Legend/Myth",
          "Family History",
          "Community Tradition",
        ],
      },
    ],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    viewCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("OralHistory", oralHistorySchema);
