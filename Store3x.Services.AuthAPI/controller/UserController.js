
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
const sql = require("mssql/msnodesqlv8");



const getAllUsers = async (req, res) => {
    try {
        const { pool } = req.app.locals;
        const request = new sql.Request(pool);
        const result = await request.query('SELECT * FROM store3x_user');
        res.json(result.recordset);
    } catch (error) {
        console.error("Error fetching data:", error.message);
        res.status(500).send("Internal Server Error");
    }
}

const createNewUser = async (req, res) => {
    try {
        const { pool } = req.app.locals;
        const { email, fname, lname, password, user_type } = req.body;

        const checkUserExistsQuery = `
            SELECT * FROM store3x_user WHERE email = @email
        `;
        const checkUserExistsResult = await pool.request()
            .input('email', email)
            .query(checkUserExistsQuery);

        if (checkUserExistsResult.recordset.length > 0) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const addUserQuery = `
            INSERT INTO store3x_user (email, fname, lname, password, user_type)
            VALUES (@email, @fname, @lname, @password, @user_type);
            SELECT * FROM store3x_user WHERE email = @email;
        `;
        const addUserResult = await pool.request()
            .input('email', email)
            .input('fname', fname)
            .input('lname', lname)
            .input('password', hashedPassword)
            .input('user_type', user_type)
            .query(addUserQuery);

        const insertedUser = addUserResult.recordset[0];

        const tokenData = {
            email: insertedUser.email,
            user_type: insertedUser.user_type,
        };
        const token = jwt.sign(tokenData, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1d' });

        res.cookie('jwt', token, { httpOnly: true, maxAge: 86400000 });
        res.status(201).json({ message: "User added successfully", data: insertedUser, token });
    } catch (error) {
        console.error("Error inserting data:", error.message);
        res.status(500).send("Internal Server Error");
    }
}

const updateUser = async (req, res) => {
    try {
        const { pool } = req.app.locals;
        const { email } = req.params;
        const { fname, lname, password, user_type } = req.body;
        const request = new sql.Request(pool);
        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await request.query(`
            UPDATE store3x_user SET fname='${fname}', lname='${lname}', password='${hashedPassword}', user_type='${user_type}' WHERE email='${email}'
        `);
        res.json({ message: "User Updated Successfully", data: result.recordset });
    } catch (error) {
        console.error("Error updating data:", error.message);
        res.status(500).send("Internal Server Error");
    }
}

const deleteUser = async (req, res) => {
    try {
        const { pool } = req.app.locals;
        const { email } = req.params;
        const request = new sql.Request(pool);
        const result = await request.query(`
            DELETE FROM store3x_user WHERE email='${email}'
        `);
        res.json({ message: `User with Email ${email} Deleted !!!`, data: result.recordset });
    } catch (error) {
        console.error("Error deleting data:", error.message);
        res.status(500).send("Internal Server Error");
    }
}

module.exports = {
    getAllUsers,
    createNewUser,
    updateUser,
    deleteUser
};
