const Response = require("../models/responseModel");

exports.getAllResponses = async (req, res) => {
  try {
    const [rows] = await Response.getAll();
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

exports.getResponseById = async (req, res) => {
  try {
    const [rows] = await Response.getById(req.params.id);
    if (rows.length === 0) {
      return res.status(404).json({ message: "Response not found" });
    }
    res.status(200).json(rows[0]);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

exports.createResponse = async (req, res) => {
    try {
      const responses = req.body;
  
      if (!Array.isArray(responses) || responses.length === 0) {
        return res.status(400).json({ message: "Request body must be a non-empty array" });
      }
  
      await Response.bulkInsert(responses);
      res.status(201).json({ message: "Responses saved successfully", count: responses.length });
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  };

exports.updateResponse = async (req, res) => {
  try {
    const responseId = req.params.id;
    const [existing] = await Response.getById(responseId);
    if (existing.length === 0) {
      return res.status(404).json({ message: "Response not found" });
    }

    await Response.update(responseId, req.body);
    res.status(200).json({ message: "Response updated" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

exports.deleteResponse = async (req, res) => {
  try {
    const [existing] = await Response.getById(req.params.id);
    if (existing.length === 0) {
      return res.status(404).json({ message: "Response not found" });
    }

    await Response.delete(req.params.id);
    res.status(200).json({ message: "Response deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

exports.updateResponseStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const [existing] = await Response.getById(req.params.id);
    if (existing.length === 0) {
      return res.status(404).json({ message: "Response not found" });
    }

    await Response.updateStatus(req.params.id, status);
    res.status(200).json({ message: "Status updated" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
