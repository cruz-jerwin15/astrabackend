const Department = require('../models/departmentModel');

exports.getAllDepartments = async (req, res) => {
  try {
    const [rows] = await Department.getAll();
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

exports.getDepartmentById = async (req, res) => {
  try {
    const [rows] = await Department.getById(req.params.id);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Department not found' });
    }
    res.status(200).json(rows[0]);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

exports.createDepartment = async (req, res) => {
  try {
    const { department_name } = req.body;

    // Check if department name already exists
    const [existing] = await Department.getByName(department_name);
    if (existing.length > 0) {
      return res.status(409).json({ message: 'Department name already exists',status: 'Exist' });
    }

    const [result] = await Department.create(req.body);
    res.status(201).json({ message: 'Department created', id: result.insertId,status:'Created' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

exports.updateDepartment = async (req, res) => {
    try {
      const departmentId = req.params.id;
      const { department_name } = req.body;
  
      // Check if the department exists
      const [department] = await Department.getById(departmentId);
      if (department.length === 0) {
        return res.status(404).json({ message: 'Department not found',status:'NFound' });
      }
  
      // Check if the new department_name is already taken by another department
      if (department_name) {
        const [existing] = await Department.getByName(department_name);
        if (existing.length > 0 && existing[0].id !== Number(departmentId)) {
          return res.status(409).json({ message: 'Department name already exists',status:'Exist' });
        }
      }
  
      const updatedDepartment = {
        ...req.body
      };
  
      await Department.update(departmentId, updatedDepartment);
      res.status(200).json({ message: 'Department updated',status:'Updated' });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  };

exports.deleteDepartment = async (req, res) => {
  try {
    const [department] = await Department.getById(req.params.id);
    if (department.length === 0) {
      return res.status(404).json({ message: 'Department not found' });
    }

    await Department.delete(req.params.id);
    res.status(200).json({ message: 'Department deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
exports.updateDepartmentStatus = async (req, res) => {
    try {
      const departmentId = req.params.id;
      const { status } = req.body;
  
      // Check if department exists
      const [department] = await Department.getById(departmentId);
      if (department.length === 0) {
        return res.status(404).json({ message: 'Department not found',status:'NFound' });
      }
  
      // Update only the status
      await Department.updateStatus(departmentId, status);
      res.status(200).json({ message: 'Department status updated',status:'Status Updated' });
    } catch (error) {
        console.error('Error updating department status:', error);
      res.status(500).json({ message: 'Server error', error });
    }
  };
  
