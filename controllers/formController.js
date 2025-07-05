const FormModel = require('../models/formModel');

const generateFormKey = () => {
    const timestamp = Date.now();
    const random = Math.floor(1000 + Math.random() * 9000);
    return `${timestamp}-${random}`;
  };

const FormController = {
  createForm: async (req, res) => {
    try {
      // Check for existing form title
      const existing = await FormModel.getByTitle(req.body.form_title);
      if (existing) {
        return res.status(400).json({ message: 'Form title already exist' });
      }
      const form_key = generateFormKey()
      const id = await FormModel.create(req.body,form_key);
      res.status(201).json({ message:'Form successfully created',id:id });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  getAllForms: async (req, res) => {
    try {
      const forms = await FormModel.getAll();
      res.json(forms);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  getFormById: async (req, res) => {
    try {
      const form = await FormModel.getById(req.params.id);
      if (!form) return res.status(404).json({ error: 'Form not found' });
      res.json(form);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
 // Get published
 getPublished: async (req, res) => {
  try {
    const forms = await FormModel.getPublished();
    res.json(forms);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving published forms.' });
  }
},

  getFormByKey: async (req, res) => {
    try {
      const form = await FormModel.getByKey(req.params.id);
      if (!form) return res.status(404).json({ error: 'Form not found' });
      res.json(form);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  updateForm: async (req, res) => {
    try {
      const existing = await FormModel.getByTitle(req.body.form_title);
      if (existing && existing.id != req.params.id) {
        return res.status(400).json({ message: 'Form title already exist' });
      }

      const result = await FormModel.update(req.params.id, req.body);
      res.json({ message: 'Updated', affectedRows: result.affectedRows });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
  updateStatus: async (req, res) => {
    try {
      const { status } = req.body;
      const id = req.params.id;
  
      const form = await FormModel.getById(id);
  
      if (!form) {
        return res.status(404).json({ message: 'Form not found' });
      }
  
      await FormModel.updateStatus(id, status);
      res.status(200).json({ message: 'Form status updated successfully' });
    } catch (error) {
      console.error('Update status error:', error);
      res.status(500).json({ message: 'Server error', error });
    }
  },
  deleteForm: async (req, res) => {
    try {
      const result = await FormModel.delete(req.params.id);
      res.json({ message: 'Deleted', affectedRows: result.affectedRows });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
};

module.exports = FormController;
