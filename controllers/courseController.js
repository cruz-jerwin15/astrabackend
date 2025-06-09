const Course = require('../models/courseModel');

exports.getAllCourses = async (req, res) => {
  try {
    const [rows] = await Course.getAll();
    res.status(200).json(rows);
  } catch (error) {
    console.error('Error getting courses:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getCourseById = async (req, res) => {
  try {
    const [rows] = await Course.getById(req.params.id);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.status(200).json(rows[0]);
  } catch (error) {
    console.error('Error getting course by id:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.createCourse = async (req, res) => {
    try {
      const { course_name } = req.body;
  
      const [existing] = await Course.getByName(course_name);
      if (existing.length > 0) {
        return res.status(409).json({ message: 'Course name already exists' });
      }
  
      const [result] = await Course.create(req.body);
      res.status(201).json({ message: 'Course created', id: result.insertId });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  };

  exports.updateCourse = async (req, res) => {
    try {
      const courseId = req.params.id;
      const { course_name } = req.body;
  
      const [existing] = await Course.getByNameExcludeId(course_name, courseId);
      if (existing.length > 0) {
        return res.status(409).json({ message: 'Course name already exists' });
      }
  
      await Course.update(courseId, req.body);
      res.status(200).json({ message: 'Course updated' });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  };

exports.updateCourseStatus = async (req, res) => {
  try {
    const id = req.params.id;
    const { status } = req.body;

    const [course] = await Course.getById(id);
    if (course.length === 0) {
      return res.status(404).json({ message: 'Course not found' });
    }

    await Course.updateStatus(id, status);
    res.status(200).json({ message: 'Course status updated' });
  } catch (error) {
    console.error('Error updating course status:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.deleteCourse = async (req, res) => {
  try {
    const id = req.params.id;

    const [course] = await Course.getById(id);
    if (course.length === 0) {
      return res.status(404).json({ message: 'Course not found' });
    }

    await Course.delete(id);
    res.status(200).json({ message: 'Course deleted' });
  } catch (error) {
    console.error('Error deleting course:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
