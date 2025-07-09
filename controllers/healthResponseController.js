const HealthResponse = require("../models/healthResponseModel");

exports.getResponsesByUserFormAndDate = async (req, res) => {
    try {
      const { user_id, form_key, date_added } = req.params;
      const [rows] = await HealthResponse.getByUserFormAndDate(user_id, form_key, date_added);
      res.status(200).json(rows);
    } catch (error) {
      console.error("Error fetching health responses:", error);
      res.status(500).json({ message: "Server error", error });
    }
  };
  exports.getGroupedResponses = async (req, res) => {
    try {
      const { form_key, date_added, user_id } = req.query;
      if (!form_key || !date_added || !user_id) {
        return res.status(400).json({ message: "Missing required parameters." });
      }
  
      const [rows] = await HealthResponse.getGroupedResponses(form_key, date_added, user_id);

      // Group the rows
      const grouped = {};
      for (const row of rows) {
        if (!grouped[row.question_id]) {
          grouped[row.question_id] = {
            question_id: row.question_id,
            question: row.question,
            answer_type: row.answer_type,
            response: []
          };
        }
        grouped[row.question_id].response.push({
          option_id: row.option_id,
          option_name: row.option_name || "",
          text: row.text
        });
      }
  
      // Convert grouped object to array
      const result = Object.values(grouped);
  
      res.json(result);
    } catch (err) {
      console.error("Error fetching grouped responses:", err);
      res.status(500).json({ message: "Internal server error." });
    }
  };