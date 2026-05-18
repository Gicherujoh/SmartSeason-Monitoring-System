const mysql = require("mysql2/promise");
require("dotenv").config();
const db = mysql.createPool({
  socketPath: '/tmp/mysql.sock',  // connect via socket, not TCP
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
});
module.exports = db;