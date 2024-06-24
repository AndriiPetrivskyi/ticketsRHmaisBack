const express = require("express");
const router = express.Router();
const db = require("../database/db"); // Import the database connection
const authenticateToken = require("../middleware/authMiddleware");
const { token } = require("morgan");

// Fetch all users
router.get("/", authenticateToken, (req, res) => {
  const sql = "SELECT * FROM sys.users;";

  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

router.post('/offuser', (req, res) => {
  const id = req.body.id;
  const sql = 'UPDATE users SET status = ? WHERE id = ?';
  const values = ["Disabled", id];

  db.query(sql, values, (err, result) => {
    if (err) {
      res.status(500).send({ success: false, message: 'Database query error' });
    } else {
      res.send({ success: true, message: 'User status updated successfully' });
    }
  });
});

router.post('/onuser', (req, res) => {
  const id = req.body.id;
  const sql = 'UPDATE users SET status = ? WHERE id = ?';
  const values = ["Enabled", id];

  db.query(sql, values, (err, result) => {
    if (err) {
      res.status(500).send({ success: false, message: 'Database query error' });
    } else {
      res.send({ success: true, message: 'User status updated successfully' });
    }
  });
});

module.exports = router;
