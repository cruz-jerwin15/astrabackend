const express = require("express");
const router = express.Router();
const roomLogController = require("../controllers/roomLogController");

// GET all logs
router.get("/", roomLogController.getAllRoomLogs);

router.get("/grouped/:user_id", roomLogController.getLogsGroupedByDate);

router.get("/user-date", roomLogController.getRoomLogsByUserAndDate);

router.get('/by-user-date', roomLogController.getLogsByUserAndDate);

router.put("/update-logout", roomLogController.updateLogOutTime);

// router.put('/logout/:id', roomLogController.updateLogOutTime);

router.get('/grouped-logs/:user_id', roomLogController.getAllLogsGroupedByDate);

// GET by id
router.get("/:id", roomLogController.getRoomLogById);

// GET by room_key
router.get("/room/:room_key", roomLogController.getRoomLogsByRoomKey);

// GET by user_id
router.get("/user/:user_id", roomLogController.getRoomLogsByUserId);

// POST create new log
router.post("/", roomLogController.createRoomLog);

// PATCH update status
router.patch("/:id/status", roomLogController.updateRoomLogStatus);

// DELETE log
router.delete("/:id", roomLogController.deleteRoomLog);

module.exports = router;
