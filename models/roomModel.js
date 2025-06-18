const db = require('../config/db');

const Room = {
    getAll: () => {
        return db.query(`
          SELECT 
            r.*, 
            b.building_name, 
            b.description AS building_description 
          FROM tbl_rooms r
          JOIN tbl_buildings b ON r.building_id = b.id
          ORDER BY r.date_updated DESC
        `);
      },
      getById: (id) => {
        return db.query(`
          SELECT 
            r.*, 
            b.building_name, 
            b.description AS building_description 
          FROM tbl_rooms r
          JOIN tbl_buildings b ON r.building_id = b.id
          WHERE r.id = ?
        `, [id]);
      },
      

  getByRoomNameInBuilding: (building_id, room_name) => {
    return db.query('SELECT * FROM tbl_rooms WHERE building_id = ? AND room_name = ?', [building_id, room_name]);
  },

  create: (data,room_key) => {
    const { building_id, room_name, status } = data;
    const now = new Date();
    return db.query(
      'INSERT INTO tbl_rooms (building_id, room_key, room_name, status, date_added, date_updated) VALUES (?, ?, ?, ?, ?, ?)',
      [building_id, room_key, room_name, status, now, now]
    );
  },

  update: (id, data) => {
    const { building_id, room_name, status } = data;
    const now = new Date();
    return db.query(
      'UPDATE tbl_rooms SET building_id = ?, room_name = ?, status = ?, date_updated = ? WHERE id = ?',
      [building_id, room_name, status, now, id]
    );
  },

  delete: (id) => {
    return db.query('DELETE FROM tbl_rooms WHERE id = ?', [id]);
  },

  updateStatus: (id, status) => {
    return db.query('UPDATE tbl_rooms SET status = ?, date_updated = ? WHERE id = ?', [status, new Date(), id]);
  }
};

module.exports = Room;
