// server.js

const express = require("express");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const sql = require("mssql/msnodesqlv8");
const app = express();
const cookieParser = require('cookie-parser');

// Import middleware
const { logger } = require('./middleware/logger');
const errorHandler = require('./middleware/ErrorHandler');

// Import routes
const authRoute = require("./routes/AuthRoute");
const userRoute = require("./routes/UserRoute");

// Load environment variables if not in production
if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

// Database configuration
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

// Create a connection pool
const pool = new sql.ConnectionPool(config);
const poolConnect = pool.connect();

poolConnect.then(() => {
    console.log("Database connected");

    // Middleware
    app.use(cors(corsOptions)); // Enable CORS
    app.use(logger); // Logging middleware
    app.use(express.json()); // Parse JSON bodies
    app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
    app.use(cookieParser()); // Parse cookies

    // Share database pool across routes
    app.locals.pool = pool;

    // Routes
    app.use("/", authRoute);
    app.use("/", userRoute);

    // Catch-all route for handling unknown routes
    app.all('*', (req, res) => {
        res.status(404).send("Sorry, the page you are looking for could not be found.");
    });

    // Error handling middleware
    app.use(errorHandler);

    // Start the server
    const port = process.env.PORT || 4001;
    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });

}).catch((err) => {
    console.error("Error connecting to the database:", err.message);
});
