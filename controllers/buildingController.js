const Building = require('../models/buildingModel');

exports.getAllBuildings = async (req, res) => {
  try {
    const [rows] = await Building.getAll();
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

exports.getBuildingById = async (req, res) => {
  try {
    const [rows] = await Building.getById(req.params.id);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Building not found' });
    }
    res.status(200).json(rows[0]);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

exports.createBuilding = async (req, res) => {
  try {
    const { building_name } = req.body;
    const [existing] = await Building.getByName(building_name);
    if (existing.length > 0) {
      return res.status(409).json({ message: 'Building name already exists', status: 'Exist' });
    }

    const [result] = await Building.create(req.body);
    res.status(201).json({ message: 'Building created', id: result.insertId, status: 'Created' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

exports.updateBuilding = async (req, res) => {
  try {
    const buildingId = req.params.id;
    const { building_name } = req.body;

    const [building] = await Building.getById(buildingId);
    if (building.length === 0) {
      return res.status(404).json({ message: 'Building not found', status: 'NFound' });
    }

    if (building_name) {
      const [existing] = await Building.getByName(building_name);
      if (existing.length > 0 && existing[0].id !== Number(buildingId)) {
        return res.status(409).json({ message: 'Building name already exists', status: 'Exist' });
      }
    }

    await Building.update(buildingId, req.body);
    res.status(200).json({ message: 'Building updated', status: 'Updated' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

exports.deleteBuilding = async (req, res) => {
  try {
    const [building] = await Building.getById(req.params.id);
    if (building.length === 0) {
      return res.status(404).json({ message: 'Building not found' });
    }

    await Building.delete(req.params.id);
    res.status(200).json({ message: 'Building deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

exports.updateBuildingStatus = async (req, res) => {
  try {
    const buildingId = req.params.id;
    const { status } = req.body;

    const [building] = await Building.getById(buildingId);
    if (building.length === 0) {
      return res.status(404).json({ message: 'Building not found', status: 'NFound' });
    }

    await Building.updateStatus(buildingId, status);
    res.status(200).json({ message: 'Building status updated', status: 'Status Updated' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
