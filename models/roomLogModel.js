const db = require("../config/db");

const RoomLogModel = {
  getAll: () => {
    return db.query(`
      SELECT * FROM tbl_room_logs
      ORDER BY log_date DESC, log_time DESC
    `);
  },

  getById: (id) => {
    return db.query(
      "SELECT * FROM tbl_room_logs WHERE id = ?",
      [id]
    );
  },
  getByUserIdAndDate: (user_id) => {
    return db.query(
      `
      SELECT
        rl.*,
        r.room_name,
        r.room_key,
        b.building_name,
        b.description AS building_description
      FROM tbl_room_logs rl
      JOIN tbl_rooms r ON rl.room_key = r.room_key
      JOIN tbl_buildings b ON r.building_id = b.id
      WHERE rl.user_id = ?
      ORDER BY rl.id DESC
      `,
      [user_id]
    );
  },
  getByRoomKey: (room_key) => {
    return db.query(
      "SELECT * FROM tbl_room_logs WHERE room_key = ? ORDER BY log_date DESC, log_time DESC",
      [room_key]
    );
  },

  getByUserId: (user_id) => {
    return db.query(
      "SELECT * FROM tbl_room_logs WHERE user_id = ? ORDER BY log_date DESC, log_time DESC",
      [user_id]
    );
  },
  getWaitingLogTodayByUser: (user_id, log_date) => {
    return db.query(
      `
      SELECT 
        rl.*, 
        r.room_name, 
        b.building_name
      FROM tbl_room_logs rl
      JOIN tbl_rooms r ON rl.room_key = r.room_key
      JOIN tbl_buildings b ON r.building_id = b.id
      WHERE rl.user_id = ?
        AND rl.log_date = ?
        AND rl.status = 'WAITING'
      LIMIT 1
      `,
      [user_id, log_date]
    );
  },
  getByUserAndDate: (user_id, log_date) => {
    return db.query(
      "SELECT * FROM tbl_room_logs WHERE user_id = ? AND log_date = ?",
      [user_id, log_date]
    );
  },
  updateLogOutTime: async (user_id, room_key, log_date) => {
    const now = new Date();
    const time = now.toTimeString().split(' ')[0]; // HH:mm:ss
    console.log('TIME',time)
    const status = 'ACTIVE';
    return db.query(
      `UPDATE tbl_room_logs 
       SET log_out = ?, status = ? 
       WHERE user_id = ? AND room_key = ? AND log_date = ?`,
      [time, status, user_id, room_key, log_date]
    );
  },
  create: (data) => {
    const {
      log_key,
      room_key,
      user_id,
      log_date,
      log_in,
      log_out,
      status
    } = data;
    return db.query(
      `INSERT INTO tbl_room_logs 
        (log_key, room_key, user_id, log_date, log_in, log_out, status)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [log_key, room_key, user_id, log_date, log_in, log_out, status]
    );
  },

  updateStatus: (id, status) => {
    return db.query(
      "UPDATE tbl_room_logs SET status = ? WHERE id = ?",
      [status, id]
    );
  },

  delete: (id) => {
    return db.query(
      "DELETE FROM tbl_room_logs WHERE id = ?",
      [id]
    );
  }
};

module.exports = RoomLogModel;
