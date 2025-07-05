const db = require("../config/db");

const Response = {
  getAll: () => {
    return db.query("SELECT * FROM tbl_responses ORDER BY date_added DESC");
  },

  getById: (id) => {
    return db.query("SELECT * FROM tbl_responses WHERE id = ?", [id]);
  },

  create: (data) => {
    const {
      user_id,
      healtdec_id,
      question_id,
      types,
      option_id,
      text,
      status
    } = data;
    const now = new Date();
    const date_submitted = now.toISOString().slice(0, 10); // YYYY-MM-DD

    return db.query(
      `INSERT INTO tbl_responses 
      (user_id, healtdec_id, question_id, types, option_id, text, status, date_added, date_updated, date_submitted) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        user_id,
        healtdec_id,
        question_id,
        types,
        option_id,
        text,
        status,
        now,
        now,
        date_submitted
      ]
    );
  },
  bulkInsert: (responses) => {
    const now = new Date();
    const date_submitted = now.toISOString().slice(0, 10); // YYYY-MM-DD
  
    const values = responses.map((r) => [
      r.user_id,
      r.healtdec_id,
      r.question_id,
      r.types,
      r.option_id,
      r.text,
      r.status,
      now,
      now,
      date_submitted,
    ]);
  
    const sql = `
      INSERT INTO tbl_responses 
      (user_id, healtdec_id, question_id, types, option_id, text, status, date_added, date_updated, date_submitted)
      VALUES ?
    `;
  
    return db.query(sql, [values]);
  },
  update: (id, data) => {
    const {
      user_id,
      healtdec_id,
      question_id,
      types,
      option_id,
      text,
      status
    } = data;
    const now = new Date();

    return db.query(
      `UPDATE tbl_responses 
       SET user_id=?, healtdec_id=?, question_id=?, types=?, option_id=?, text=?, status=?, date_updated=? 
       WHERE id = ?`,
      [
        user_id,
        healtdec_id,
        question_id,
        types,
        option_id,
        text,
        status,
        now,
        id
      ]
    );
  },

  delete: (id) => {
    return db.query("DELETE FROM tbl_responses WHERE id = ?", [id]);
  },

  updateStatus: (id, status) => {
    const now = new Date();
    return db.query(
      "UPDATE tbl_responses SET status = ?, date_updated = ? WHERE id = ?",
      [status, now, id]
    );
  },
};

module.exports = Response;
