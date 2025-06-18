const db = require('../config/db');

const Option = {
  getAll: () => {
    return db.query('SELECT * FROM tbl_options ORDER BY date_updated DESC');
  },

  getById: (id) => {
    return db.query('SELECT * FROM tbl_options WHERE id = ?', [id]);
  },

  getByQuestionId: (question_id) => {
    return db.query('SELECT * FROM tbl_options WHERE question_id = ? ORDER BY date_updated DESC', [question_id]);
  },

  create: (data) => {
    const { question_id, option_name, status } = data;
    const now = new Date();
    return db.query(
      'INSERT INTO tbl_options (question_id, option_name, status, date_added, date_updated) VALUES (?, ?, ?, ?, ?)',
      [question_id, option_name, status, now, now]
    );
  },

  update: (id, data) => {
    const { question_id, option_name, status } = data;
    const now = new Date();
    return db.query(
      'UPDATE tbl_options SET question_id = ?, option_name = ?, status = ?, date_updated = ? WHERE id = ?',
      [question_id, option_name, status, now, id]
    );
  },

  delete: (id) => {
    return db.query('DELETE FROM tbl_options WHERE id = ?', [id]);
  },

  updateStatus: (id, status) => {
    return db.query(
      'UPDATE tbl_options SET status = ?, date_updated = ? WHERE id = ?',
      [status, new Date(), id]
    );
  },
  createMultiple: (options) => {
    const now = new Date();
    const values = options.map(opt => [
      opt.question_id,
      opt.option_name,
      opt.status,
      now,
      now
    ]);
  
    return db.query(
      'INSERT INTO tbl_options (question_id, option_name, status, date_added, date_updated) VALUES ?',
      [values]
    );
  },
};

module.exports = Option;
