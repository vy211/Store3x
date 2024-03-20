const { format } = require('date-fns');
const { v4: uuid } = require('uuid');
const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');

const logEvent = async (message, logFileName) => {
    const dateTime = format(new Date(), 'yyyyMMdd\tHH:mm:ss');
    const logItem = `${dateTime}\t${uuid()}\t${message}\n`;

    try {
        const logDir = path.join(__dirname, '..', 'logs');
        if (!fs.existsSync(logDir)) {
            await fsPromises.mkdir(logDir);
        }
        await fsPromises.appendFile(path.join(logDir, logFileName), logItem);
    } catch (err) {
        console.error('Error logging event:', err);
        throw err; // Propagate error to be caught by global error handler or middleware
    }
};

const logger = (req, res, next) => {
    logEvent(`${req.method}\t${req.url}\t${req.headers.origin || ''}`, 'reqLog.log');
    console.log("HTTP Method: " + req.method + ", URL: " + req.url);
    next();
};

module.exports = { logEvent, logger };
