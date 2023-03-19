const httpStatus = require('http-status')

const authService = require('../services/auth.service')
const tokenService = require('../services/token.service')
const validateError = require('../utils/validateError')
const catchAsync = require('../utils/catchAsync')

const login = catchAsync(async (req, res) => {
    const isError = await validateError(req, res)
    if (!isError) {
        const {_doc: user} = await authService.login(req, res)
        const token = await tokenService.generateToken(user)
        const {password, ...resUser} = user
        res.send({user: resUser, token})
    }
})

const register = catchAsync(async (req, res) => {
    const isError = await validateError(req, res)
    if (!isError) {
        await authService.register(req.body)
        res.status(httpStatus.CREATED).json({
            success: true,
            message: 'Tạo tài khoản thành công'
        })
    }
})

module.exports = {
    login,
    register
}
