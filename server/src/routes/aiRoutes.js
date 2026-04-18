const express = require("express");
const router = express.Router();
const aiController = require("../controllers/aiController");

// Check if functions exist
console.log("askAI:", typeof aiController.askAI);
console.log(
  "getSuggestedQuestions:",
  typeof aiController.getSuggestedQuestions,
);

// Public routes
router.post("/ask", aiController.askAI);
router.get("/suggested", aiController.getSuggestedQuestions);

module.exports = router;
