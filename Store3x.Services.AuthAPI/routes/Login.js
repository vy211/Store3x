// Login.js

const express = require("express");
const jwt = require('jsonwebtoken');
const router = express.Router();
const sql = require("mssql/msnodesqlv8");

router.post("/", async (req, res) => {
    try {
        const { pool } = req.app.locals;
        const { email, password } = req.body;
        const request = new sql.Request(pool);
        const result = await request.query(`
            SELECT * FROM store3x_user WHERE email='${email}' AND password='${password}'
        `);

        if (result.recordset.length > 0) {
            // Authentication successful, generate a JWT token with 1-day expiration
            const token = jwt.sign({ email: result.recordset[0].email }, process.env.JWT_SECRET, { expiresIn: '1d' });

            // Set the token as a cookie
            res.cookie('jwt', token, { httpOnly: true, maxAge: 86400000 }); // 1 day expiration in milliseconds

            res.json({ message: "User fetched successfully", data: result.recordset, token });
        } else {
            res.status(404).json({ message: `User with Email ${email} not found` });
        }
    } catch (error) {
        console.error("Error fetching data:", error.message);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;
