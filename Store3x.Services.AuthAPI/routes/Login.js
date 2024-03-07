const express = require("express");
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
            res.json({ message: "User fetched Successfully", data: result.recordset });
        } else {
            res.status(404).json({ message: `User with Email ${email} not found` });
        }
    } catch (error) {
        console.error("Error fetching data:", error.message);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;
