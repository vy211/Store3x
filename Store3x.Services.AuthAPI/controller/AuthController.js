
const jwt = require('jsonwebtoken');
const sql = require("mssql/msnodesqlv8");
const bcrypt = require("bcrypt");
const asyncHandler = require('express-async-handler')

async function fetchUserFromDB(pool, email) {
    try {
        const request = new sql.Request(pool);
        const result = await request.query(`SELECT * FROM store3x_user WHERE email='${email}'`);
        return result.recordset.length > 0 ? result.recordset[0] : null;
    } catch (error) {
        console.error("Error fetching user data:", error.message);
        throw error; 
    }
}

const login = async (req, res) => {
    try {
        const { pool } = req.app.locals;
        const { email, password } = req.body;

        const user = await fetchUserFromDB(pool, email);
        if (!user ) {
            return res.status(401).json({ message: `User with email '${email}' not found` })
        }

        const match = await bcrypt.compare(password, user.password)

        if (!match) return res.status(401).json({ message: 'Incorrect Password !!!' })

        const tokenData = {
            email: user.email,
            fname: user.fname,
            lname: user.lname,
            user_type: user.user_type
        };

        const accessToken = jwt.sign(
            tokenData,
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '15m' }
        )

        


        res.cookie('jwt', accessToken, {
            //httpOnly: true, //accessible only by web server 
            secure: true, //https
            sameSite: 'None', //cross-site cookie 
            maxAge: 7 * 24 * 60 * 60 * 1000 //cookie expiry: set to match 
        })


        res.json({ user, accessToken })
    } catch (error) {
        console.error("Error handling request:", error.message);
        // Respond with an internal server error status code (500)
        return res.status(500).send("Internal Server Error");
    }
};


const refresh = async (req, res) => {
    const cookies = req.cookies

    if (!cookies?.jwt) return res.status(401).json({ message: 'Unauthorized' })

    const refreshToken = cookies.jwt

    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        asyncHandler(async (err, decoded) => {
            if (err) return res.status(403).json({ message: 'Forbidden' })
            const { pool } = req.app.locals;
            const { email, password } = req.body;
            const user = await fetchUserFromDB(pool, email);

            if (!user) return res.status(401).json({ message: 'Unauthorized' })

            const tokenData = {
                email: user.email,
                fname: user.fname,
                lname: user.lname,
                user_type: user.user_type
            };

            const accessToken = jwt.sign(
                tokenData,
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '15m' }
            )

            res.json({ user, accessToken })
        })
    )
}


const logout = async (req, res) => {
    const cookies = req.cookies
    if (!cookies?.jwt) return res.sendStatus(204) //No content
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true })
    res.json({ message: 'Cookie cleared' })
}

module.exports = {
    login,
    refresh,
    logout
}