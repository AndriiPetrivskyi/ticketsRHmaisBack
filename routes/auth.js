// routes/auth.js
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const db = require("../database/db"); // Assuming you have a db.js for MySQL connection

// Secret key for JWT
const util = require("util");
const JWT_SECRET = "your_jwt_secret"; // Replace with your actual JWT secret

// Promisify the db.query method
const query = util.promisify(db.query).bind(db);

router.post("/login", async (req, res) => {
  try {
    console.log(req.body);
    const { username, password } = req.body;

    const sql = `SELECT * FROM sys.users WHERE username = '${username}'`;

    // Await the result of the query
    const results = await query(sql);
    console.log(results);

    if (results.length === 0) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const user = results[0];
    console.log("user: ", user);

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    console.log("is match: ", isMatch);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // User authenticated, generate JWT
    const token = jwt.sign(
      {
        id: user.id,
        type: user.type,
        username: user.username,
        email: user.email,
      },
      JWT_SECRET,
      {
        expiresIn: "24h",
      }
    );

    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
