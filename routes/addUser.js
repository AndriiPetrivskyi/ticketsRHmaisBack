const express = require("express");
const router = express.Router();
const db = require("../database/db");

router.post("/addUser", async (req, res) => {
    try {
        console.log(req.body);
        const { id, name, password, email, type } = req.body;

        const sql = `INSERT INTO sys.users (id, username, password, email, type) VALUES (?, ?, ?, ?, ?)`;
    
        // Await the result of the query and use parameterized query
        const results = await db.query(sql, [id, name, password, email, type]);
        console.log(results);

        const user = results[0];
        console.log("user: ", user);
        res.status(200).json({ message: "User added successfully", user });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
})

module.exports = router;
