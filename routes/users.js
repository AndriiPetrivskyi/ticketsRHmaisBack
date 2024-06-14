const express = require("express");
const router = express.Router();
const db = require("../database/db"); // Import the database connection
const authenticateToken = require("../middleware/authMiddleware");

// Fetch all users
router.get("/", authenticateToken, (req, res) => {
  const sql = "SELECT * FROM sys.sys_config;";

  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

module.exports = router;
