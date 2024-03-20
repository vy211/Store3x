const jwt = require('jsonwebtoken');

function auth(req, res, next) {
    try {
        // Retrieve JWT token from cookies
        const token = req.cookies.jwt;

        // If token is not present, return unauthorized
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized: No token provided' });
        }

        // Verify the token
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(401).json({ message: 'Unauthorized: Invalid token' });
            } else {
                // If token is valid, attach the decoded payload to request object
                req.user = decoded;
                next(); // Proceed to the next middleware
            }
        });
    } catch (error) {
        console.error('Authentication error:', error.message);
        // If an error occurs during authentication, return internal server error
        return res.status(500).send('Internal Server Error');
    }
}

module.exports = auth;
