const Section = require('../models/sectionModel');

exports.getAllSections = async (req, res) => {
  try {
    const [rows] = await Section.getAll();
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

exports.getSectionById = async (req, res) => {
  try {
    const [rows] = await Section.getById(req.params.id);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Section not found' });
    }
    res.status(200).json(rows[0]);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

exports.createSection = async (req, res) => {
  try {
    const { section_name,course_id } = req.body;

    // Ensure section_name is unique
    const [existing] = await Section.getByName(section_name,course_id);
    console.log(existing)
    if (existing.length > 0) {
      return res.status(409).json({ message: 'Section name already exists in the course' });
    }

    const [result] = await Section.create(req.body);
    res.status(201).json({ message: 'Section created', id: result.insertId });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

exports.updateSection = async (req, res) => {
  try {
    const { section_name, course_id } = req.body;

    // Check for duplicates in the same course (excluding the current record)
    const [existing] = await Section.getByName(section_name, course_id);
    if (existing.length > 0 && existing[0].id != req.params.id) {
      return res.status(409).json({ message: 'Section name already exists in this course' });
    }

    const [section] = await Section.getById(req.params.id);
    if (section.length === 0) {
      return res.status(404).json({ message: 'Section not found' });
    }

    await Section.update(req.params.id, req.body);
    res.status(200).json({ message: 'Section updated' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

exports.updateStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const [section] = await Section.getById(req.params.id);
    if (section.length === 0) {
      return res.status(404).json({ message: 'Section not found' });
    }

    await Section.updateStatus(req.params.id, status);
    res.status(200).json({ message: 'Section status updated' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

exports.deleteSection = async (req, res) => {
  try {
    const [section] = await Section.getById(req.params.id);
    if (section.length === 0) {
      return res.status(404).json({ message: 'Section not found' });
    }

    await Section.delete(req.params.id);
    res.status(200).json({ message: 'Section deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
