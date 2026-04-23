const db = require("../config/db");

// CREATE FIELD (admin)
exports.createField = async (req, res) => {
  try {
    const { name, cropType, plantingDate, assigned_agent_id } = req.body;

    const [result] = await db.query(
      "INSERT INTO fields (name, cropType, plantingDate, assigned_agent_id) VALUES (?, ?, ?, ?)",
      [name, cropType, plantingDate, assigned_agent_id]
    );

    res.json({ id: result.insertId, message: "Field created" });
  } catch (err) {
    res.status(500).json({ message: "Error creating field" });
  }
};

// GET FIELDS (role-based)
exports.getFields = async (req, res) => {
  try {
    let query = "SELECT * FROM fields";
    let params = [];

    if (req.user.role === "agent") {
      query += " WHERE assigned_agent_id = ?";
      params.push(req.user.id);
    }

    const [fields] = await db.query(query, params);

    res.json(fields);
  } catch (err) {
    res.status(500).json({ message: "Error fetching fields" });
  }
};

// UPDATE FIELD + ADD NOTE
exports.updateField = async (req, res) => {
  try {
    const { stage, note } = req.body;
    const fieldId = req.params.id;

    if (stage) {
      await db.query("UPDATE fields SET stage = ? WHERE id = ?", [
        stage,
        fieldId,
      ]);
    }

    if (note) {
      await db.query("INSERT INTO notes (field_id, note) VALUES (?, ?)", [
        fieldId,
        note,
      ]);
    }

    res.json({ message: "Field updated" });
  } catch (err) {
    res.status(500).json({ message: "Error updating field" });
  }
};