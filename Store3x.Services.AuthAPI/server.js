
const express = require("express");
const cors = require("cors");
const sql = require("mssql/msnodesqlv8");
const axios = require('axios'); 

const app = express();
app.use(cors());
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

            const result = await request.query('SELECT * FROM store3x_user');

            res.json(result.recordset);
        } catch (error) {
            console.error("Error fetching data:", error.message);
            res.status(500).send("Internal Server Error");
        }
    });

    //insert new user
    app.post("/addUser", async (req, res) => {
        try {
            const { email, fname, lname, password, user_type } = req.body;
            const request = new sql.Request(pool);
            const result = await request.query(`
                INSERT INTO store3x_user (email, fname, lname, password, user_type) VALUES ('${email}','${fname}','${lname}','${password}','${user_type}')
            `);
            res.json({ message: "User Added Successfully", data: result.recordset })
        }
        catch (error) {
            console.error("Error inserting data:", error.message);
            res.status(500).send("Internal Server Error");
        }
    });

    //Delete
    app.delete("/remove/:email", async (req, res) => {
        try {
            const { email } = req.params;
            const request = new sql.Request(pool);

            const result = await request.query(`
            DELETE FROM store3x_user WHERE email=${email}
            `);
            res.json({ message: `User with Email ${email} Deleted !!!`, data: result.recordset });
        } catch (error) {
            console.error("Error deleting data:", error.message);
            res.status(500).send("Internal Server Error");
        }
    });

    //Update
    app.put("/update/:email", async (req, res) => {
        try {
            const { email } = req.params;
            const { fname, lname, password, user_type } = req.body;
            const request = new sql.Request(pool);
            const result = await request.query(`
                UPDATE store3x_user  SET fname='${fname}',lname='${lname}',password='${password}',user_type='${user_type}' WHERE email= '${email}'
            `);
            res.json({ message: "User Updated Successfully", data: result.recordset })
        }
        catch (error) {
            console.error("Error inserting data:", error.message);
            res.status(500).send("Internal Server Error");
        }
    });

    //Get user by ID
    app.post("/getByEmail", async (req, res) => {
        try {
            const { email, password } = req.body;
    
            console.log(email + password);
    
            
            const request = new sql.Request(pool);
            const result = await request.query(`
                SELECT * FROM store3x_user WHERE email= '${email}' AND password='${password}'
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
    })



    // Start the server
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });
}).catch((err) => {
    console.error("Error connecting to the database:", err.message);
});
