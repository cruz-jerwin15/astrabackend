// models/userModel.js
const db = require('../config/db');

const User = {
  create: (user, callback) => {
    const sql = `
      INSERT INTO tbl_users 
      (stud_emp_id, role, email, password, lastname, firstname, middlename, phone, department_id, course_id, section_id, status, date_added, date_updated)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    db.query(sql, [
      user.stud_emp_id,
      user.role,
      user.email,
      user.password,
      user.lastname,
      user.firstname,
      user.middlename || null,
      user.phone,
      user.department_id,
      user.course_id || null,
      user.section_id || null,
      user.status,
      user.date_added,
      user.date_updated
    ], callback);
  },

  findAll: (callback) => {
    db.query('SELECT * FROM tbl_users', callback);
  },

  findById: (id, callback) => {
    db.query('SELECT * FROM tbl_users WHERE id = ?', [id], callback);
  },

  update: (id, user, callback) => {
    const sql = `
      UPDATE tbl_users SET 
        stud_emp_id = ?, role = ?, email = ?, password = ?, lastname = ?, firstname = ?, middlename = ?, phone = ?, 
        department_id = ?, course_id = ?, section_id = ?, status = ?, date_updated = ?
      WHERE id = ?
    `;
    db.query(sql, [
      user.stud_emp_id,
      user.role,
      user.email,
      user.password,
      user.lastname,
      user.firstname,
      user.middlename || null,
      user.phone,
      user.department_id,
      user.course_id || null,
      user.section_id || null,
      user.status,
      user.date_updated,
      id
    ], callback);
  },

  delete: (id, callback) => {
    db.query('DELETE FROM tbl_users WHERE id = ?', [id], callback);
  }
};

module.exports = User;
