const express = require("express");
const router = express.Router();
const sql = require("mssql/msnodesqlv8");

router.delete("/:email", async (req, res) => {
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
});

module.exports = router;
