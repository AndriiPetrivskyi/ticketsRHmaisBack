const express = require("express");
const router = express.Router();
const db = require("../database/db");
const bcrypt = require("bcryptjs"); // Import bcrypt

const saltRounds = 10;

router.post("/addUser", (req, res) => {
  const { id, name, password, email, type } = req.body;

  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) {
      console.error("Error hashing password: ", err);
      return res.status(500).json({ message: "Server error", error: err.message });
    }

    const values = [id, name, hash, email, type, "Enabled"];
    const sql = `INSERT INTO sys.users (id, username, password, email, type, status) VALUES (?, ?, ?, ?, ?, ?)`;

    db.query(sql, values, (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Server error", error: err.message });
      }
      
      if (results && results.affectedRows === 1) {
        res.status(200).json({ message: "User added successfully" });
      } else {
        res.status(500).json({ message: "Failed to add user" });
      }
    });
  });
});

module.exports = router;
