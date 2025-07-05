const express = require("express");
const router = express.Router();
const responseController = require("../controllers/responseController");

router.get("/", responseController.getAllResponses);
router.get("/:id", responseController.getResponseById);
router.post("/", responseController.createResponse);
router.put("/:id", responseController.updateResponse);
router.delete("/:id", responseController.deleteResponse);
router.patch("/:id/status", responseController.updateResponseStatus);

module.exports = router;
