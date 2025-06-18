const db = require('../config/db');

const Section = {
  getAll: () => {
    return db.query(`
      SELECT 
        s.*, 
        c.course_name, 
        c.description AS course_description 
      FROM tbl_sections s
      JOIN tbl_courses c ON s.course_id = c.id
      ORDER BY date_updated DESC
    `);
  },
  
  getById: (id) => {
    return db.query(`
      SELECT 
        s.*, 
        c.course_name, 
        c.description AS course_description 
      FROM tbl_sections s
      JOIN tbl_courses c ON s.course_id = c.id
      WHERE s.id = ?
    `, [id]);
  },

  getByName: (section_name, course_id) => db.query('SELECT * FROM tbl_sections WHERE section_name = ? AND course_id = ?', [section_name,course_id]),

  create: (data) => {
    const { course_id, section_name,status } = data;
    const now = new Date();
    return db.query(
      'INSERT INTO tbl_sections (course_id, section_name,status, date_added, date_updated) VALUES (?, ?, ?, ?,?)',
      [course_id, section_name,status, now, now]
    );
  },

  update: (id, data) => {
    const { course_id, section_name } = data;
    const now = new Date();
    return db.query(
      'UPDATE tbl_sections SET course_id = ?, section_name = ?, date_updated = ? WHERE id = ?',
      [course_id, section_name, now, id]
    );
  },

  updateStatus: (id, status) => {
    const now = new Date();
    return db.query(
      'UPDATE tbl_sections SET status = ?, date_updated = ? WHERE id = ?',
      [status, now, id]
    );
  },

  delete: (id) => db.query('DELETE FROM tbl_sections WHERE id = ?', [id]),
};

module.exports = Section;