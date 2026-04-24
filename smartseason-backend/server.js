require("dotenv").config();

const express = require("express");
const cors = require("cors");

const db = require("./config/db");

// Routes
const authRoutes = require("./routes/authRoutes");
const fieldRoutes = require("./routes/fieldRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/fields", fieldRoutes);

// Test DB connection
async function testDB() {
  try {
    const connection = await db.getConnection();
    console.log("MySQL Connected");
    connection.release();
  } catch (err) {
    console.error(" DB Connection Failed:", err.message);
  }
}

// 🌱 Seed users
const bcrypt = require("bcryptjs");

async function seedUsers() {
  try {
    const hashed = await bcrypt.hash("123456", 10);

    // Admin
    await db.query(
      "INSERT IGNORE INTO users (name, email, password, role) VALUES (?, ?, ?, ?)",
      ["Admin", "admin@test.com", hashed, "admin"]
    );

    // Agent
    await db.query(
      "INSERT IGNORE INTO users (name, email, password, role) VALUES (?, ?, ?, ?)",
      ["Agent", "agent@test.com", hashed, "agent"]
    );

    console.log(" Users seeded");
  } catch (err) {
    console.error("Seed error:", err.message);
  }
}

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  console.log(` Server running on port ${PORT}`);

  await testDB();
  await seedUsers();
});