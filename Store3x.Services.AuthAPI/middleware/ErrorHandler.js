const { logEvent } = require('./logger');

const errorHandler = (err, req, res, next) => {
    // Log the error
    logEvent(`${err.name}: ${err.message}\t${req.method}\t${req.url}\t${req.headers.origin}`, 'errLog.log');

    // Log the error stack trace
    console.error(err.stack);

    // Get the status code from the response or default to 500
    const status = res.statusCode || 500;

    // Set the response status code
    res.status(status);

    // Send the error message as JSON response
    res.json({ message: err.message });
};

module.exports = errorHandler;
