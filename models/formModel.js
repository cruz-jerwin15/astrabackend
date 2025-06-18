const db = require('../config/db');

const FormModel = {
  create: async (form,form_key) => {
    const { form_title, instruction, status, user_id } = form;
    const [result] = await db.execute(
      `INSERT INTO tbl_forms (form_key, form_title, instruction, status, user_id, date_added, date_updated)
       VALUES (?, ?, ?, ?, ?, NOW(), NOW())`,
      [form_key, form_title, instruction, status, user_id]
    );
    return result.insertId;
  },

  getAll: async () => {
    const [rows] = await db.execute('SELECT * FROM tbl_forms ORDER BY date_updated DESC');
    return rows;
  },
  // Add this method inside FormModel
getByTitle: async (form_title) => {
    const [rows] = await db.execute('SELECT * FROM tbl_forms WHERE form_title = ?', [form_title]);
    return rows[0];
  },
  getById: async (id) => {
    const [rows] = await db.execute('SELECT * FROM tbl_forms WHERE id = ?', [id]);
    return rows[0];
  },
  getByKey: async (id) => {
    const [rows] = await db.execute('SELECT * FROM tbl_forms WHERE form_key = ?', [id]);
    return rows[0];
  },

  update: async (id, form) => {
    const { form_title, instruction, status, user_id } = form;
    const [result] = await db.execute(
      `UPDATE tbl_forms SET form_title=?, instruction=?, status=?, user_id=?, date_updated=NOW() WHERE id=?`,
      [form_title, instruction, status, user_id, id]
    );
    return result;
  },

  updateStatus: (id, status) => {
    const now = new Date();
    return db.query(
      'UPDATE tbl_forms SET status = ?, date_updated = ? WHERE id = ?',
      [status, now, id]
    );
  },

  delete: async (id) => {
    const [result] = await db.execute('DELETE FROM tbl_forms WHERE id = ?', [id]);
    return result;
  }
};

module.exports = FormModel;
