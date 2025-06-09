const express = require('express');
const router = express.Router();
const sectionController = require('../controllers/sectionController');

router.get('/', sectionController.getAllSections);
router.get('/:id', sectionController.getSectionById);
router.post('/', sectionController.createSection);
router.put('/:id', sectionController.updateSection);
router.patch('/:id/status', sectionController.updateStatus);
router.delete('/:id', sectionController.deleteSection);

module.exports = router;
