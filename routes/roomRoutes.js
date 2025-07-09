const express = require('express');
const router = express.Router();
const roomController = require('../controllers/roomController');

router.post('/', roomController.createRoom);
router.get('/', roomController.getAllRooms);
router.get("/key/:room_key", roomController.getRoomByKey);
router.get('/:id', roomController.getRoomById);
router.put('/:id', roomController.updateRoom);
router.delete('/:id', roomController.deleteRoom);
router.patch('/:id/status', roomController.updateRoomStatus);

module.exports = router;
