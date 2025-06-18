const db = require('../config/db');

const Building = {
  getAll: () => {
    return db.query('SELECT * FROM tbl_buildings ORDER BY date_updated DESC');
  },

  getById: (id) => {
    return db.query('SELECT * FROM tbl_buildings WHERE id = ?', [id]);
  },

  getByName: (name) => {
    return db.query('SELECT * FROM tbl_buildings WHERE building_name = ?', [name]);
  },

  create: (data) => {
    const { building_name, description, status } = data;
    const now = new Date();
    return db.query(
      'INSERT INTO tbl_buildings (building_name, description, status, date_added, date_updated) VALUES (?, ?, ?, ?, ?)',
      [building_name, description, status, now, now]
    );
  },

  update: (id, data) => {
    const { building_name, description, status } = data;
    const now = new Date();
    return db.query(
      'UPDATE tbl_buildings SET building_name = ?, description = ?, status = ?, date_updated = ? WHERE id = ?',
      [building_name, description, status, now, id]
    );
  },

  delete: (id) => {
    return db.query('DELETE FROM tbl_buildings WHERE id = ?', [id]);
  },

  updateStatus: (id, status) => {
    return db.query(
      'UPDATE tbl_buildings SET status = ?, date_updated = ? WHERE id = ?',
      [status, new Date(), id]
    );
  },
};

module.exports = Building;
