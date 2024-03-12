const express = require("express");
const cors = require("cors"); // Import the cors middleware
const sql = require("mssql/msnodesqlv8");
const app = express();
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

const allUserRoute = require("./routes/AllUsers");
const addUserRoute = require("./routes/AddUser");
const removeUserRoute = require("./routes/RemoveUser");
const updateUserRoute = require("./routes/UpdateUser");
const loginRoute = require("./routes/Login");

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

const pool = new sql.ConnectionPool(config);
const poolConnect = pool.connect();

poolConnect.then(() => {
    console.log("Database connected");

    app.use(cors({
        origin: 'http://localhost:3000',
        credentials: true,
    }));

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cookieParser());

    // Set the pool in app.locals for use in routes
    app.locals.pool = pool;

    app.use("/allUser", allUserRoute);
    app.use("/addUser", addUserRoute);
    app.use("/removeUser", removeUserRoute);
    app.use("/updateUser", updateUserRoute);
    app.use("/login", loginRoute);

    const port = process.env.PORT || 4001;
    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });
}).catch((err) => {
    console.error("Error connecting to the database:", err.message);
});
