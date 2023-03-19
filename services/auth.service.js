const httpStatus = require('http-status')
const bcrypt = require('bcrypt')

const ApiError = require('../utils/ApiError')
const UserModel = require('../models/user')
const userService = require('./user.service')

const login = async (req, res) => {
    const {email, password} = req.body
    const user = await userService.getUserByEmail(email)
    if (!user || !(await user.isPasswordMatch(password))) {
        throw new ApiError(httpStatus.NOT_FOUND,'Sai tên tài khoản hoặc mật khẩu')
    }
    return user
}

const register = async (body) => {
    const {email} = body
    if (await userService.getUserByEmail(email)) {
        throw new ApiError(httpStatus.ALREADY_REPORTED,'Email đã được sử dụng')
    }
    body.password = await bcrypt.hash(body.password, 8)
    return UserModel.create(body)
}

module.exports = {
    login,
    register
}
