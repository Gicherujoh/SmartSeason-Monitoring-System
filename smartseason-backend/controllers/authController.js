const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
  console.log("1. Login hit");
  try {
    const { email, password } = req.body;
    console.log("2. Body:", email, password);

    const [users] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
    console.log("3. Users found:", users.length);

    if (users.length === 0)
      return res.status(400).json({ message: "User not found" });

    const user = users[0];

    const valid = await bcrypt.compare(password, user.password);
    console.log("4. Password valid:", valid);

    if (!valid) return res.status(400).json({ message: "Invalid password" });

    console.log("5. JWT_SECRET:", process.env.JWT_SECRET);
    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET);
    console.log("6. Token generated");

    res.json({ token, role: user.role });
  } catch(err) {
    console.error("LOGIN ERROR:", err);
    res.status(500).json({ message: err.message, stack: err.stack });
  }
};