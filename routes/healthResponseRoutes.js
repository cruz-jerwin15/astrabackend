const express = require("express");
const router = express.Router();
const healthResponseController = require("../controllers/healthResponseController");

// GET all responses for a user and form_key
router.get("/:user_id/:form_key/:date_added", healthResponseController.getResponsesByUserFormAndDate);
router.get("/grouped", healthResponseController.getGroupedResponses);

module.exports = router;
