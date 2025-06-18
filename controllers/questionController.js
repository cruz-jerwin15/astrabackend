const Question = require('../models/questionModel');

exports.getAllQuestions = async (req, res) => {
  try {
    const [rows] = await Question.getAll();
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

exports.getQuestionById = async (req, res) => {
  try {
    const [rows] = await Question.getById(req.params.id);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Question not found' });
    }
    res.status(200).json(rows[0]);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

exports.createQuestion = async (req, res) => {
  try {
    const [result] = await Question.create(req.body);
    res.status(201).json({ message: 'Question created', id: result.insertId });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

exports.updateQuestion = async (req, res) => {
  try {
    const questionId = req.params.id;
    const [existing] = await Question.getById(questionId);
    if (existing.length === 0) {
      return res.status(404).json({ message: 'Question not found' });
    }

    await Question.update(questionId, req.body);
    res.status(200).json({ message: 'Question updated' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

exports.deleteQuestion = async (req, res) => {
  try {
    const [existing] = await Question.getById(req.params.id);
    if (existing.length === 0) {
      return res.status(404).json({ message: 'Question not found' });
    }

    await Question.delete(req.params.id);
    res.status(200).json({ message: 'Question deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

exports.updateQuestionStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const questionId = req.params.id;

    const [existing] = await Question.getById(questionId);
    if (existing.length === 0) {
      return res.status(404).json({ message: 'Question not found' });
    }

    await Question.updateStatus(questionId, status);
    res.status(200).json({ message: 'Status updated' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
exports.getQuestionsWithOptions = async (req, res) => {
  try {
    const { form_key } = req.params;

    const result = await Question.getQuestionsWithOptionsByFormKey(form_key);
    res.json(result);
  } catch (error) {
    console.error('Error getting questions with options:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};
