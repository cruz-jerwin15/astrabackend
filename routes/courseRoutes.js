const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');

router.get('/', courseController.getAllCourses);
router.get('/:id', courseController.getCourseById);
router.post('/', courseController.createCourse);
router.put('/:id', courseController.updateCourse);
router.patch('/:id/status', courseController.updateCourseStatus);
router.delete('/:id', courseController.deleteCourse);

module.exports = router;
