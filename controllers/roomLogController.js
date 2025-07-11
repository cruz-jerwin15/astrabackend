const RoomLog = require("../models/roomLogModel");


const generateFormKey = () => {
    const timestamp = Date.now();
    const random = Math.floor(1000 + Math.random() * 9000);
    return `${timestamp}-${random}`;
  };
exports.getAllRoomLogs = async (req, res) => {
  try {
    const [rows] = await RoomLog.getAll();
    res.json(rows);
  } catch (err) {
    console.error("Error fetching room logs:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getRoomLogById = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await RoomLog.getById(id);
    if (rows.length === 0) {
      return res.status(404).json({ message: "Room log not found" });
    }
    res.json(rows[0]);
  } catch (err) {
    console.error("Error fetching room log:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getRoomLogsByRoomKey = async (req, res) => {
  try {
    const { room_key } = req.params;
    const [rows] = await RoomLog.getByRoomKey(room_key);
    res.json(rows);
  } catch (err) {
    console.error("Error fetching room logs by room key:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getRoomLogsByUserId = async (req, res) => {
  try {
    const { user_id } = req.params;
    const [rows] = await RoomLog.getByUserId(user_id);
    res.json(rows);
  } catch (err) {
    console.error("Error fetching room logs by user id:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.createRoomLog = async (req, res) => {
  try {
    const {
      room_key,
      user_id,
      log_out,
      status
    } = req.body;

    const now = new Date();
    const log_date = now.toISOString().split("T")[0];
    const log_in = now.toTimeString().split(" ")[0];
    const log_key = generateFormKey()

    console.log('Log_date',log_date)

    await RoomLog.create({
      log_key,
      room_key,
      user_id,
      log_date,
      log_in,
      log_out,
      status
    });

    res.json({ message: "Room log created successfully" });
  } catch (err) {
    console.error("Error creating room log:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.createRoomLog = async (req, res) => {
    try {
      const {
        room_key,
        user_id,
        log_out,
        status
      } = req.body;
  

      const log_key = generateFormKey()
      const now = new Date();
      const dateParts = now.toLocaleDateString('en-PH', {
        timeZone: 'Asia/Manila',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      })
        .split('/')
        .reverse();
      const log_date = `${dateParts[0]}-${dateParts[1]}-${dateParts[2]}`;
      // const log_date = `${year}-${month}-${day}`;
      const log_in = now.toLocaleTimeString('en-PH', {
        timeZone: 'Asia/Manila',
        hour12: false, // Use 24-hour format
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });
           
  
      // Only check if status is WAITING
      if (status === 'WAITING') {
        // Check if any WAITING log exists today
        const [existing] = await RoomLog.getWaitingLogTodayByUser(user_id, log_date);
        if (existing.length > 0) {
          return res.status(200).json({
            message: "A WAITING log already exists for this user today.",
            status: 0,
            log: existing[0]
          });
        }
      }
  
      await RoomLog.create({
        log_key,
        room_key,
        user_id,
        log_date,
        log_in,
        log_out,
        status
      });
  
      res.json({ message: "Room log created successfully.", status: 1 });
    } catch (err) {
      console.error("Error creating room log:", err);
      res.status(500).json({ message: "Internal server error" });
    }
  };
  exports.updateLogOutTime = async (req, res) => {
    try {
      const { user_id, room_key, log_date } = req.body;
     console.log('USER',user_id)
     console.log('room',room_key)
     console.log('date',log_date)
      if (!user_id || !room_key || !log_date) {
        return res.status(400).json({ message: "Missing required fields: user_id, room_key, or log_date." });
      }
    
      await RoomLog.updateLogOutTime(user_id, room_key, log_date);
      res.json({ message: "Log out time updated successfully." });
    
    } catch (error) {
      console.error("Error updating log out time:", error);
      res.status(500).json({ message: "Internal server error." });
    }
  };
  exports.getRoomLogsByUserAndDate = async (req, res) => {
    try {
      const { user_id, log_date } = req.query;
  
      if (!user_id || !log_date) {
        return res
          .status(400)
          .json({ message: "user_id and log_date are required." });
      }
  
      const [rows] = await RoomLog.getByUserAndDate(user_id, log_date);
  
      res.json(rows);
    } catch (err) {
      console.error("Error fetching room logs by user and date:", err);
      res.status(500).json({ message: "Internal server error." });
    }
  };

exports.updateRoomLogStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    await RoomLog.updateStatus(id, status);
    res.json({ message: "Room log status updated successfully" });
  } catch (err) {
    console.error("Error updating room log status:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};
exports.getLogsByUserAndDate = async (req, res) => {
  try {
    const { user_id } = req.query;

    if (!user_id) {
      return res.status(400).json({ message: "user_id are required." });
    }

    const [logs] = await RoomLog.getByUserIdAndDate(user_id);
    console.log(logs)
    res.json(logs);
  } catch (error) {
    console.error("Error fetching room logs by user and date:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};
exports.deleteRoomLog = async (req, res) => {
  try {
    const { id } = req.params;
    await RoomLog.delete(id);
    res.json({ message: "Room log deleted successfully" });
  } catch (err) {
    console.error("Error deleting room log:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};
