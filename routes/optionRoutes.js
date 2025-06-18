const express = require('express');
const router = express.Router();
const optionController = require('../controllers/optionController');

router.get('/', optionController.getAllOptions);
router.get('/:id', optionController.getOptionById);
router.get('/question/:question_id', optionController.getOptionsByQuestionId);
router.post('/', optionController.createOption);
router.put('/:id', optionController.updateOption);
router.delete('/:id', optionController.deleteOption);
router.patch('/:id/status', optionController.updateOptionStatus);
router.post('/bulk', optionController.createMultipleOptions);

module.exports = router;
