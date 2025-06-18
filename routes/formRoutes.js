const express = require('express');
const router = express.Router();
const FormController = require('../controllers/formController');

router.post('/', FormController.createForm);
router.get('/', FormController.getAllForms);
router.get('/:id', FormController.getFormById);
router.put('/:id', FormController.updateForm);
router.patch('/:id/status', FormController.updateStatus);
router.get('/id/:id', FormController.getFormByKey);
router.delete('/:id', FormController.deleteForm);

module.exports = router;
