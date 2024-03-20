const rateLimit = require('express-rate-limit');
const { logEvents, logEvent } = require('./logger');

const loginLimiter = rateLimit({
    windowMs: 60 * 1000,
    max: 5,
    message: {
        message: 'To many attempts from this IP, Please try again after 60 second pause !!'
    },
    handler: (req, res, next, options) => {
        logEvent(`To many requests : ${options.message.message}\t${req.method}\t${req.url}\t${req.headers.origin}`, 'errLog.log');
        res.status(options.statusCode).send(options.message);
    },
    standardHeaders: true,
    legacyHeaders: false,

})
module.exports = loginLimiter;