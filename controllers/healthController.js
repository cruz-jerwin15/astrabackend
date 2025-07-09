const Health = require("../models/healthModel");

exports.getAllHealth = async (req, res) => {
  try {
    const [rows] = await Health.getAll();
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
exports.getHealthByUserId = async (req, res) => {
  try {
    const userId = req.params.user_id;
    const [rows] = await Health.getByUserId(userId);
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
exports.getHealthByUserIdLast = async (req, res) => {
  try {
    const userId = req.params.user_id;
    const [rows] = await Health.getByUserIdLast(userId);
    res.status(200).json(rows[0]);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
exports.getHealthByUserAndForm = async (req, res) => {
  try {
    const { user_id, form_key } = req.query;

    if (!user_id || !form_key) {
      return res.status(400).json({ message: "user_id and form_key are required." });
    }

    const [rows] = await Health.getByUserAndForm(user_id, form_key);

    if (rows.length === 0) {
      return res.status(404).json({ message: "No health record found for given user_id and form_key." });
    }

    res.json(rows[0]);
  } catch (err) {
    console.error("Error fetching health records by user and form:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getHealthById = async (req, res) => {
  try {
    const [rows] = await Health.getById(req.params.id);
    if (rows.length === 0) {
      return res.status(404).json({ message: "Record not found" });
    }
    res.status(200).json(rows[0]);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

exports.createHealth = async (req, res) => {
    try {
      const { form_key, user_id, status } = req.body;
    //   const date_added = new Date().toLocaleDateString().slice(0, 10); // YYYY-MM-DD
      const date_added = new Date().toLocaleDateString('en-CA');
      // Check for duplicate
      const [existing] = await Health.checkDuplicateDate(user_id, date_added);

      console.log(existing)
      console.log(date_added)
      if (existing.length > 0) {
        return res.status(201).json({
          message: "A record for this user on today's date already exists",
          status: 0
        });
      }
  
      // Insert if no duplicate
      const [result] = await Health.create({ form_key, user_id, status });
      res.status(201).json({ message: "Health record created",result:result.insertId,status:1 });
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  };
  

exports.updateHealth = async (req, res) => {
  try {
    const healthId = req.params.id;
    const [existing] = await Health.getById(healthId);
    if (existing.length === 0) {
      return res.status(404).json({ message: "Record not found" });
    }

    await Health.update(healthId, req.body);
    res.status(200).json({ message: "Health record updated" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

exports.deleteHealth = async (req, res) => {
  try {
    const [existing] = await Health.getById(req.params.id);
    if (existing.length === 0) {
      return res.status(404).json({ message: "Record not found" });
    }

    await Health.delete(req.params.id);
    res.status(200).json({ message: "Health record deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

exports.updateHealthStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const [existing] = await Health.getById(req.params.id);
    if (existing.length === 0) {
      return res.status(404).json({ message: "Record not found" });
    }

    await Health.updateStatus(req.params.id, status);
    res.status(200).json({ message: "Status updated" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
