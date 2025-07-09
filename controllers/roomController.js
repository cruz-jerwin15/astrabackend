const Room = require('../models/roomModel');

const generateFormKey = () => {
    const timestamp = Date.now();
    const random = Math.floor(1000 + Math.random() * 9000);
    return `${timestamp}-${random}`;
  };
exports.getAllRooms = async (req, res) => {
  try {
    const [rows] = await Room.getAll();
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
exports.getRoomByKey = async (req, res) => {
  try {
    const { room_key } = req.params;

    if (!room_key) {
      return res.status(400).json({ message: "room_key is required." });
    }

    const [rows] = await Room.getByRoomKey(room_key);

    if (rows.length === 0) {
      return res.status(404).json({ message: "Room not found." });
    }

    res.json(rows[0]);
  } catch (err) {
    console.error("Error fetching room by key:", err);
    res.status(500).json({ message: "Internal server error." });
  }
};
exports.getRoomById = async (req, res) => {
  try {
    const [rows] = await Room.getById(req.params.id);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Room not found' });
    }
    res.status(200).json(rows[0]);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

exports.createRoom = async (req, res) => {
  try {
    const { building_id, room_name } = req.body;
    const [existing] = await Room.getByRoomNameInBuilding(building_id, room_name);

    if (existing.length > 0) {
      return res.status(409).json({ message: 'Room name already exists in this building', status: 'Exist' });
    }
    const room_key = generateFormKey()
    const [result] = await Room.create(req.body,room_key);
    res.status(201).json({ message: 'Room created', id: result.insertId, status: 'Created' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

exports.updateRoom = async (req, res) => {
  try {
    const roomId = req.params.id;
    const { building_id, room_name } = req.body;

    const [room] = await Room.getById(roomId);
    if (room.length === 0) {
      return res.status(404).json({ message: 'Room not found', status: 'NFound' });
    }

    if (room_name && building_id) {
      const [existing] = await Room.getByRoomNameInBuilding(building_id, room_name);
      if (existing.length > 0 && existing[0].id !== Number(roomId)) {
        return res.status(409).json({ message: 'Room name already exists in this building', status: 'Exist' });
      }
    }

    await Room.update(roomId, req.body);
    res.status(200).json({ message: 'Room updated', status: 'Updated' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

exports.deleteRoom = async (req, res) => {
  try {
    const [room] = await Room.getById(req.params.id);
    if (room.length === 0) {
      return res.status(404).json({ message: 'Room not found' });
    }

    await Room.delete(req.params.id);
    res.status(200).json({ message: 'Room deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

exports.updateRoomStatus = async (req, res) => {
  try {
    const roomId = req.params.id;
    const { status } = req.body;

    const [room] = await Room.getById(roomId);
    if (room.length === 0) {
      return res.status(404).json({ message: 'Room not found', status: 'NFound' });
    }

    await Room.updateStatus(roomId, status);
    res.status(200).json({ message: 'Room status updated', status: 'Status Updated' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
