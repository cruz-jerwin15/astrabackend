const db = require("../config/db");

const Time = {
  getAll: () => {
    return db.query("SELECT * FROM tbl_time ORDER BY date_updated DESC");
  },

  getById: (id) => {
    return db.query("SELECT * FROM tbl_time WHERE id = ?", [id]);
  },

  getByTime: (time) => {
    return db.query("SELECT * FROM tbl_time WHERE time = ?", [time]);
  },

  create: (data) => {
    const { time, status } = data;
    const now = new Date();
    return db.query(
      `INSERT INTO tbl_time 
        (time, status, date_added, date_updated) 
        VALUES (?, ?, ?, ?)`,
      [time, status, now, now]
    );
  },

  update: (id, data) => {
    const { time, status } = data;
    const now = new Date();
    return db.query(
      `UPDATE tbl_time 
        SET time = ?, status = ?, date_updated = ? 
        WHERE id = ?`,
      [time, status, now, id]
    );
  },

  delete: (id) => {
    return db.query("DELETE FROM tbl_time WHERE id = ?", [id]);
  },

  updateStatus: (id, status) => {
    const now = new Date();
    return db.query(
      `UPDATE tbl_time 
        SET status = ?, date_updated = ? 
        WHERE id = ?`,
      [status, now, id]
    );
  },
  getPublished: () => {
    return db.query("SELECT * FROM tbl_time WHERE status = 'PUBLISHED' ORDER BY date_updated DESC");
  },
  
};

module.exports = Time;
