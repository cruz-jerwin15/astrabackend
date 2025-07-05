const Time = require("../models/timeModel");

exports.getAllTimes = async (req, res) => {
  try {
    const [rows] = await Time.getAll();
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

exports.getTimeById = async (req, res) => {
  try {
    const [rows] = await Time.getById(req.params.id);
    if (rows.length === 0) {
      return res.status(404).json({ message: "Time entry not found" });
    }
    res.status(200).json(rows[0]);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

exports.createTime = async (req, res) => {
  try {
    const { time } = req.body;

    // Check if time already exists
    const [existing] = await Time.getByTime(time);
    if (existing.length > 0) {
      return res.status(409).json({ message: "Time already exists", status: "Exist" });
    }

    const [result] = await Time.create(req.body);
    res.status(201).json({ message: "Time created", id: result.insertId, status: "Created" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

exports.updateTime = async (req, res) => {
  try {
    const timeId = req.params.id;
    const { time } = req.body;

    const [existing] = await Time.getById(timeId);
    if (existing.length === 0) {
      return res.status(404).json({ message: "Time entry not found", status: "NFound" });
    }

    if (time) {
      const [duplicate] = await Time.getByTime(time);
      if (duplicate.length > 0 && duplicate[0].id !== Number(timeId)) {
        return res.status(409).json({ message: "Time already exists", status: "Exist" });
      }
    }

    await Time.update(timeId, req.body);
    res.status(200).json({ message: "Time updated", status: "Updated" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

exports.deleteTime = async (req, res) => {
  try {
    const [existing] = await Time.getById(req.params.id);
    if (existing.length === 0) {
      return res.status(404).json({ message: "Time entry not found" });
    }

    await Time.delete(req.params.id);
    res.status(200).json({ message: "Time deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

exports.updateTimeStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const [existing] = await Time.getById(req.params.id);
    if (existing.length === 0) {
      return res.status(404).json({ message: "Time entry not found", status: "NFound" });
    }

    await Time.updateStatus(req.params.id, status);
    res.status(200).json({ message: "Time status updated", status: "Status Updated" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
exports.getPublishedTimes = async (req, res) => {
    try {
      const [rows] = await Time.getPublished();
      res.status(200).json(rows[0]);
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  };
  
