const express = require("express");
const router = express.Router();
const healthController = require("../controllers/healthController");

router.get("/", healthController.getAllHealth);
router.get("/by-user-form", healthController.getHealthByUserAndForm);
router.get("/user/:user_id", healthController.getHealthByUserId);
router.get("/user/last/:user_id", healthController.getHealthByUserIdLast);
router.get("/:id", healthController.getHealthById);
router.post("/", healthController.createHealth);
router.put("/:id", healthController.updateHealth);
router.delete("/:id", healthController.deleteHealth);
router.patch("/:id/status", healthController.updateHealthStatus);

module.exports = router;
