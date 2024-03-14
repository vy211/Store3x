const express = require("express");
const router = express.Router();
const sql = require("mssql/msnodesqlv8");
const bcrypt = require("bcrypt");

router.put("/:email", async (req, res) => {
    try {
        const { pool } = req.app.locals;
        const { email } = req.params;
        const { fname, lname, password, user_type } = req.body;
        const request = new sql.Request(pool);
        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await request.query(`
            UPDATE store3x_user SET fname='${fname}', lname='${lname}', password='${hashedPassword}', user_type='${user_type}' WHERE email='${email}'
        `);
        res.json({ message: "User Updated Successfully", data: result.recordset })
    }
    catch (error) {
        console.error("Error updating data:", error.message);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;
