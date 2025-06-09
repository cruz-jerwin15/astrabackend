const db = require('../config/db');

const Department = {
  getAll: () => {
    return db.query('SELECT * FROM tbl_departments ORDER BY date_updated DESC');
  },

  getById: (id) => {
    return db.query('SELECT * FROM tbl_departments WHERE id = ?', [id]);
  },

  getByName: (name) => {
    return db.query('SELECT * FROM tbl_departments WHERE department_name = ?', [name]);
  },

  create: (data) => {
    const { department_name, description, status } = data;
    const now = new Date();
    return db.query(
      'INSERT INTO tbl_departments (department_name, description, status, date_added, date_updated) VALUES (?, ?, ?, ?, ?)',
      [department_name, description, status, now, now]
    );
  },

  update: (id, data) => {
    const { department_name, description, status } = data;
    const now = new Date();
    return db.query(
      'UPDATE tbl_departments SET department_name = ?, description = ?, status = ?, date_updated = ? WHERE id = ?',
      [department_name, description, status, now, id]
    );
  },

  delete: (id) => {
    return db.query('DELETE FROM tbl_departments WHERE id = ?', [id]);
  },

  // Update only status by id
    updateStatus: (id, status) => {
    return db.query(
      'UPDATE tbl_departments SET status = ?, date_updated = ? WHERE id = ?',
      [status, new Date(), id]
    );
  },
};

module.exports = Department;
