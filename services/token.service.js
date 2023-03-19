var jwt = require('jsonwebtoken');

const generateToken = user => {
    const payload = {
        userId: user?.id
    }
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET)
}

module.exports = {
    generateToken
}
