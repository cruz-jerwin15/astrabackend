const db = require('../config/db');

const Question = {
  getQuestionsWithOptionsByFormKey: async (form_key) => {
    const [questions] = await db.query(
      'SELECT * FROM tbl_questions WHERE form_key = ? ORDER BY id ASC',
      [form_key]
    );

    if (questions.length === 0) return [];

    const questionIds = questions.map(q => q.id);
    const [options] = await db.query(
      `SELECT * FROM tbl_options WHERE question_id IN (?)`,
      [questionIds]
    );

    // Group options by question_id
    const optionsMap = {};
    options.forEach(opt => {
      if (!optionsMap[opt.question_id]) {
        optionsMap[opt.question_id] = [];
      }
      optionsMap[opt.question_id].push(opt);
    });

    // Attach options to each question
    const questionsWithOptions = questions.map(q => ({
      ...q,
      options: optionsMap[q.id] || []
    }));

    return questionsWithOptions;
  },
  getAll: () => {
    return db.query('SELECT * FROM tbl_questions ORDER BY date_updated DESC');
  },

  getById: (id) => {
    return db.query('SELECT * FROM tbl_questions WHERE id = ?', [id]);
  },

  create: (data) => {
    const { form_key, question, answer_type, status } = data;
    const now = new Date();
    return db.query(
      'INSERT INTO tbl_questions (form_key, question, answer_type, status, date_added, date_updated) VALUES (?, ?, ?, ?, ?, ?)',
      [form_key, question, answer_type, status, now, now]
    );
  },

  update: (id, data) => {
    const { form_key, question, answer_type, status } = data;
    const now = new Date();
    return db.query(
      'UPDATE tbl_questions SET form_key = ?, question = ?, answer_type = ?, status = ?, date_updated = ? WHERE id = ?',
      [form_key, question, answer_type, status, now, id]
    );
  },

  delete: (id) => {
    return db.query('DELETE FROM tbl_questions WHERE id = ?', [id]);
  },

  updateStatus: (id, status) => {
    return db.query(
      'UPDATE tbl_questions SET status = ?, date_updated = ? WHERE id = ?',
      [status, new Date(), id]
    );
  },
};

module.exports = Question;
