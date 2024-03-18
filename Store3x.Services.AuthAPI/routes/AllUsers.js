// routes/allUser.js
const express = require("express");
const router = express.Router();
const sql = require("mssql/msnodesqlv8");

router.get("/", async (req, res) => {
    try {
        const { pool } = req.app.locals;
        const request = new sql.Request(pool);
        const result = await request.query('SELECT * FROM store3x_user');
        res.json(result.recordset);
    } catch (error) {
        console.error("Error fetching data:", error.message);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;

