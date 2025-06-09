const db = require('../config/db');

const Course = {
  getAll: () => {
    return db.query('SELECT * FROM tbl_courses');
  },

  getById: (id) => {
    return db.query('SELECT * FROM tbl_courses WHERE id = ?', [id]);
  },

  getByNameAndDepartment: (course_name, department_id) => {
    return db.query(
      'SELECT * FROM tbl_courses WHERE course_name = ? AND department_id = ?',
      [course_name, department_id]
    );
  },

  create: ({ department_id, course_name, description, status }) => {
    const date = new Date();
    return db.query(
      'INSERT INTO tbl_courses (department_id, course_name, description, status, date_added, date_updated) VALUES (?, ?, ?, ?, ?, ?)',
      [department_id, course_name, description, status, date, date]
    );
  },

  update: (id, { department_id, course_name, description, status }) => {
    const date = new Date();
    return db.query(
      'UPDATE tbl_courses SET department_id = ?, course_name = ?, description = ?, status = ?, date_updated = ? WHERE id = ?',
      [department_id, course_name, description, status, date, id]
    );
  },

  updateStatus: (id, status) => {
    const date = new Date();
    return db.query(
      'UPDATE tbl_courses SET status = ?, date_updated = ? WHERE id = ?',
      [status, date, id]
    );
  },

  delete: (id) => {
    return db.query('DELETE FROM tbl_courses WHERE id = ?', [id]);
  },
  getByName: (course_name) => {
    return db.query('SELECT * FROM tbl_courses WHERE course_name = ?', [course_name]);
  },
  
  getByNameExcludeId: (course_name, id) => {
    return db.query(
      'SELECT * FROM tbl_courses WHERE course_name = ? AND id != ?',
      [course_name, id]
    );
  },

  getByNameAndDepartmentExcludeId: (course_name, department_id, id) => {
    return db.query(
      'SELECT * FROM tbl_courses WHERE course_name = ? AND department_id = ? AND id != ?',
      [course_name, department_id, id]
    );
  }
};

module.exports = Course;
