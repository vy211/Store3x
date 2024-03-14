// routes/addUser.js
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

router.post("/", async (req, res) => {
    try {
        const { pool } = req.app.locals;
        const { email, fname, lname, password, user_type } = req.body;

        // Check if the user already exists
        const checkUserExistsQuery = `
            SELECT * FROM store3x_user WHERE email = @email
        `;
        const checkUserExistsResult = await pool.request()
            .input('email', email)
            .query(checkUserExistsQuery);

        if (checkUserExistsResult.recordset.length > 0) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert the new user
        const addUserQuery = `
            INSERT INTO store3x_user (email, fname, lname, password, user_type)
            VALUES (@email, @fname, @lname, @password, @user_type);
            SELECT * FROM store3x_user WHERE email = @email;  -- Fetch the inserted user's information
        `;
        const addUserResult = await pool.request()
            .input('email', email)
            .input('fname', fname)
            .input('lname', lname)
            .input('password', hashedPassword)
            .input('user_type', user_type)
            .query(addUserQuery);

        const insertedUser = addUserResult.recordset[0];

        // Create JWT token
        const tokenData = {
            email: insertedUser.email,
            user_type: insertedUser.user_type,
        };
        const token = jwt.sign(tokenData, process.env.JWT_SECRET, { expiresIn: '1d' });

        // Set JWT token in a cookie
        res.cookie('jwt', token, { httpOnly: true, maxAge: 86400000 }); // 1 day expiration in milliseconds

        // Respond with success message, inserted user's information, and token
        res.status(201).json({ message: "User added successfully", data: insertedUser, token });
    } catch (error) {
        console.error("Error inserting data:", error.message);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;
