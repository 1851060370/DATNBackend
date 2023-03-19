const {validationResult} = require('express-validator')

const validateError = async (req,res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        res.status(400).json({
            success: false,
            message: errors.array()[0].msg
        })
        return true
    }
    return false
}

module.exports = validateError
