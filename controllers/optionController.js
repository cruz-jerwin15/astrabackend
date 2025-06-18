const Option = require('../models/optionModel');

exports.getAllOptions = async (req, res) => {
  try {
    const [rows] = await Option.getAll();
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

exports.getOptionById = async (req, res) => {
  try {
    const [rows] = await Option.getById(req.params.id);
    if (rows.length === 0) return res.status(404).json({ message: 'Option not found' });
    res.status(200).json(rows[0]);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

exports.getOptionsByQuestionId = async (req, res) => {
  try {
    const [rows] = await Option.getByQuestionId(req.params.question_id);
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

exports.createOption = async (req, res) => {
  try {
    const [result] = await Option.create(req.body);
    res.status(201).json({ message: 'Option created', id: result.insertId });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

exports.updateOption = async (req, res) => {
  try {
    const optionId = req.params.id;
    const [existing] = await Option.getById(optionId);
    if (existing.length === 0) return res.status(404).json({ message: 'Option not found' });

    await Option.update(optionId, req.body);
    res.status(200).json({ message: 'Option updated' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

exports.deleteOption = async (req, res) => {
  try {
    const [existing] = await Option.getById(req.params.id);
    if (existing.length === 0) return res.status(404).json({ message: 'Option not found' });

    await Option.delete(req.params.id);
    res.status(200).json({ message: 'Option deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

exports.createMultipleOptions = async (req, res) => {
    try {
      const options = req.body.options;
      if (!Array.isArray(options) || options.length === 0) {
        return res.status(400).json({ message: 'Options array is required' });
      }
  
      await Option.createMultiple(options);
      res.status(201).json({ message: 'Multiple options created successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  };

exports.updateOptionStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const [existing] = await Option.getById(req.params.id);
    if (existing.length === 0) return res.status(404).json({ message: 'Option not found' });

    await Option.updateStatus(req.params.id, status);
    res.status(200).json({ message: 'Status updated' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
