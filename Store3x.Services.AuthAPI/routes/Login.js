const express = require("express");
const jwt = require('jsonwebtoken');
const router = express.Router();
const sql = require("mssql/msnodesqlv8");
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
    try {
        const { pool } = req.app.locals;
        const { email, password } = req.body;
        const request = new sql.Request(pool);

        const result = await request.query(`
            SELECT * FROM store3x_user WHERE email='${email}'
        `);

        if (result.recordset.length > 0) {
            const user = result.recordset[0];

            // Compare the hashed password from the database with the password provided by the user
            const passwordMatch = await bcrypt.compare(password, user.password);

            if (passwordMatch) {
                const tokenData = {
                    email: user.email,
                    fname: user.fname,
                    lname: user.lname,
                    user_type: user.user_type,
                };

                const token = jwt.sign(tokenData, process.env.JWT_SECRET, { expiresIn: '1d' });

                res.cookie('jwt', token, { httpOnly: true, maxAge: 86400000 });

                // Respond with a success status code (200) and the user information
                return res.status(200).json({ message: "User fetched successfully", data: user, token });
            } else {
                // Respond with an unauthorized status code (401) for incorrect password
                return res.status(401).json({ message: "Incorrect Password !!!" });
            }
        } else {
            // Respond with a not found status code (404) for user not found
            return res.status(404).json({ message: `Incorrect Email Id !!!` });
        }
    } catch (error) {
        console.error("Error fetching data:", error.message);
        // Respond with an internal server error status code (500)
        return res.status(500).send("Internal Server Error");
    }
});

module.exports = router;
