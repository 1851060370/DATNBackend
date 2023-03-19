const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {
    // get token form header
    const authHeader = req.header('Authorization')
    const token = authHeader && authHeader.split(' ')[1]

    if (!token) {
        res.status(401).json({
            success: false,
            message: 'Access token not found!'
        })
    }

    try {
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        next()
    } catch (error) {
        res.status(403).json({
            success: false,
            message: 'Invalid Token!'
        })
    }
}

module.exports = verifyToken
