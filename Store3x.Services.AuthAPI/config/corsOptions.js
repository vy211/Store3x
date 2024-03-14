
const allowedOrigins = require('./allowedOrigins');


const corsOptions = {
    origin: (origin, callback) => {
        if (allowedOrigins.indexOf(origin) != -1 || !origin) {
            callback(null, true)
        }
        else {
            callback(new errors('Not alloed by CORS !!'))
        }
    },
    credentials: true,
    optionsSuccessStatus : 200
}

module.exports = corsOptions