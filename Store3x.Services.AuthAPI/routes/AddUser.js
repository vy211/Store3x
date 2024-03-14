// routes/addUser.js
const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
    try {
        const { pool } = req.app.locals;
        const { email, fname, lname, password, user_type } = req.body;

        const request = pool.request();  // Use pool.request() to create a new request

        const result = await request.query(`
            INSERT INTO store3x_user (email, fname, lname, password, user_type)
            VALUES ('${email}','${fname}','${lname}','${password}','${user_type}')
        `);

        res.json({ message: "User Added Successfully", data: result.recordset });
    } catch (error) {
        console.error("Error inserting data:", error.message);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;
