const db = require("../config/db");

const Health = {
  getAll: () => {
    return db.query("SELECT * FROM tbl_health ORDER BY date_added DESC");
  },

  getById: (id) => {
    return db.query("SELECT * FROM tbl_health WHERE id = ?", [id]);
  },
  getByUserId: (user_id) => {
    return db.query(
      "SELECT * FROM tbl_health WHERE user_id = ? ORDER BY date_added DESC",
      [user_id]
    );
  },
  getByUserIdLast: (user_id) => {
    return db.query(
      "SELECT * FROM tbl_health WHERE user_id = ? ORDER BY date_added DESC",
      [user_id]
    );
  },
  create: (data) => {
    const { form_key, user_id, status } = data;
    const date_added = new Date();
    const timeString = date_added.toTimeString().split(' ')[0];
    console.log(timeString);
    return db.query(
      "INSERT INTO tbl_health (form_key, user_id, status, date_added,time) VALUES (?, ?, ?, ?, ?)",
      [form_key, user_id, status, date_added,timeString]
    );
  },
  getByUserAndForm: (user_id, form_key) => {
    return db.query(
      "SELECT * FROM tbl_health WHERE user_id = ? AND form_key = ? ORDER BY date_added DESC",
      [user_id, form_key]
    );
  },

  update: (id, data) => {
    const { form_key, user_id, status } = data;
    return db.query(
      "UPDATE tbl_health SET form_key = ?, user_id = ?, status = ? WHERE id = ?",
      [form_key, user_id, status, id]
    );
  },

  delete: (id) => {
    return db.query("DELETE FROM tbl_health WHERE id = ?", [id]);
  },

  updateStatus: (id, status) => {
    return db.query(
      "UPDATE tbl_health SET status = ? WHERE id = ?",
      [status, id]
    );
  },
  checkDuplicateDate: (user_id, date_added) => {
    return db.query(
      "SELECT * FROM tbl_health WHERE user_id = ? AND date_added = ?",
      [user_id, date_added]
    );
  },
  
};

module.exports = Health;
