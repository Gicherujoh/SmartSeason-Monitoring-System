const router = require("express").Router();
const db = require("../config/db");
const { login } = require("../controllers/authController");
const auth = require("../middleware/authMiddleware");

// 🔐 LOGIN
router.post("/login", login);

// 👨‍🌾 GET AGENTS (FOR DROPDOWN)
router.get("/agents", auth, async (req, res) => {
  try {
    const [agents] = await db.query(
      "SELECT id, name FROM users WHERE role = 'agent'"
    );

    res.json(agents);
  } catch (err) {
    res.status(500).json({ message: "Error fetching agents" });
  }
});

module.exports = router;