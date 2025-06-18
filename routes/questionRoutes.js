const express = require('express');
const router = express.Router();
const questionController = require('../controllers/questionController');

router.get('/', questionController.getAllQuestions);
router.get('/:id', questionController.getQuestionById);
router.post('/', questionController.createQuestion);
router.put('/:id', questionController.updateQuestion);
router.delete('/:id', questionController.deleteQuestion);
router.patch('/:id/status', questionController.updateQuestionStatus);
router.get('/form/:form_key/questions-with-options', questionController.getQuestionsWithOptions);

module.exports = router;
