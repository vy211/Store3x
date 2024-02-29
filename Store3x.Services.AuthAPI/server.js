const express = require("express");
const sql = require("mssql/msnodesqlv8");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

const config = {
    server: process.env.SERVER,
    database: process.env.DATABASE,
    user: process.env.USER,
    password: process.env.PASSWORD,
    driver: process.env.DRIVER,
    options: {
        trustedConnection: true,
    },
};

// Connect to the database
const pool = new sql.ConnectionPool(config);
const poolConnect = pool.connect();

poolConnect.then(() => {
    console.log("Database connected");

    //All user
    app.get("/allUser", async (req, res) => {
        try {
            const request = new sql.Request(pool);

            const result = await request.query('SELECT * FROM sam');

            res.json(result.recordset);
        } catch (error) {
            console.error("Error fetching data:", error.message);
            res.status(500).send("Internal Server Error");
        }
    });

    //insert new user
    app.post("/addUser", async (req, res) => {
        try {
            const { name } = req.body;
            const request = new sql.Request(pool);
            const result = await request.query(`
                INSERT INTO sam (name) VALUES ('${name}')
            `);
            res.json({ message: "User Added Successfully", data: result.recordset })
        }
        catch (error) {
            console.error("Error inserting data:", error.message);
            res.status(500).send("Internal Server Error");
        }
    });

    //Delete
    app.delete("/remove/:id", async (req, res) => {
        try {
            const { id } = req.params;
            const request = new sql.Request(pool);

            const result = await request.query(`
            DELETE FROM sam WHERE id=${id}
            `);
            res.json({ message: `User with ID ${id} Deleted !!!`, data: result.recordset });
        } catch (error) {
            console.error("Error deleting data:", error.message);
            res.status(500).send("Internal Server Error");
        }
    });

    //Update
    app.put("/update/:id", async (req, res) => {
        try {
            const { id } = req.params;
            const { name } = req.body;
            const request = new sql.Request(pool);
            const result = await request.query(`
                UPDATE sam SET name='${name}' WHERE id= ${id}
            `);
            res.json({ message: "User Updated Successfully", data: result.recordset })
        }
        catch (error) {
            console.error("Error inserting data:", error.message);
            res.status(500).send("Internal Server Error");
        }
    });

    //Get user by ID
    app.get("/getById/:id", async (req, res) => {
        try {
            const { id } = req.params;
            const request = new sql.Request(pool);
            const result = await request.query(`
                SELECT * FROM sam WHERE id= ${id}
            `);
            if (result.recordset.length > 0) {
                res.json({ message: "User fetch Successfully", data: result.recordset });
            }
            else {
                res.status(404).json({ message: `Student with id ${id} not found !!!!` });
            }
        }
        catch (error) {
            console.error("Error fetchin data:", error.message);
            res.status(500).send("Internal Server Error");
        }
    })



    // Start the server
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });
}).catch((err) => {
    console.error("Error connecting to the database:", err.message);
});
