const db = require("../config/db");

const HealthResponse = {
    getByUserFormAndDate: (user_id, form_key, date_added) => {
    return db.query(
      `
      SELECT 
        h.*,
        r.id AS response_id,
        r.question_id,
        r.types,
        r.option_id,
        r.text,
        r.status AS response_status,
        r.date_added AS response_date_added,
        r.date_updated AS response_date_updated,
        r.date_submitted
      FROM tbl_health h
      INNER JOIN tbl_responses r
        ON h.id = r.healtdec_id
      WHERE h.user_id = ? AND h.form_key = ? AND h.date_added = ?
      ORDER BY r.id
      `,
      [user_id, form_key, date_added]
    );
  },
  getGroupedResponses: (form_key, date_added, user_id) => {
    const sql = `
      SELECT
        q.id AS question_id,
        q.question,
        q.answer_type,
        r.option_id,
        o.option_name,
        r.text
      FROM tbl_health h
      JOIN tbl_responses r
        ON h.id = r.healtdec_id
      JOIN tbl_questions q
        ON r.question_id = q.id
      LEFT JOIN tbl_options o
        ON r.option_id = o.id
      WHERE
        h.form_key = ?
        AND h.date_added = ?
        AND h.user_id = ?
      ORDER BY q.id ASC, r.id ASC
    `;
    return db.query(sql, [form_key, date_added, user_id]);
  }
};

module.exports = HealthResponse;
