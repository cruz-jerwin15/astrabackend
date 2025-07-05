const express = require("express");
const router = express.Router();
const timeController = require("../controllers/timeController");

router.get("/", timeController.getAllTimes);
router.get("/published", timeController.getPublishedTimes);
router.get("/:id", timeController.getTimeById);
router.post("/", timeController.createTime);
router.put("/:id", timeController.updateTime);
router.delete("/:id", timeController.deleteTime);
router.patch("/:id/status", timeController.updateTimeStatus);



module.exports = router;
