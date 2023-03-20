const httpStatus = require('http-status')
const bcrypt = require('bcrypt')

const ApiError = require('../utils/ApiError')
const userModel = require('../models/user')
const uploadFileCloudinary = require('../utils/uploadFileCloudinary')

const getUserByEmail = async email => {
    const user = await userModel.findOne({email})
    return user
}

const resetPassword = async (email, oldPassword) => {
    const user = await getUserByEmail(email)
    if (!(await user.isPasswordMatch(oldPassword))) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Mật khẩu cũ không chính xác')
    }
    const newPassword = await bcrypt.hash(req?.body?.newPassword, 8)
    return await user.updateOne({password: newPassword}, {new: true})
}

const getUsers = async (page, limit, sort, restQuery) => {
    const sortArr = sort.split(' ')
    const name = restQuery?.name ?? ''
    const email = restQuery?.email ?? ''
    delete restQuery?.name
    delete restQuery?.email

    const users = await userModel
        .find({
            name: {$regex: name, $options: 'i'},
            email: {$regex: email, $options: 'i'},
            ...restQuery
        })
        .select('-password')
        .skip(limit * page - limit)
        .limit(limit)
        .sort({[sortArr[0]]: Number(sortArr[1])})

    const totalUsers = await userModel.countDocuments({
        name: {$regex: name, $options: 'i'},
        email: {$regex: email, $options: 'i'},
        ...restQuery
    })

    return {users, totalUsers}
}

const getDetailUser = async id => {
    const user = await userModel.findById(id)
    if (!user) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Không tìm thấy người dùng')
    }
    return user
}

const createUser = async (body, file) => {
    const user = await getUserByEmail(body.email)
    const avatar = await uploadFileCloudinary(file)
    if (user) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Email đã được sử dụng')
    }
    body.password = await bcrypt.hash(body.password, 8)
    body.avatar = avatar
    return await userModel.create(body)
}

const updateUserById = async (userId, userBody, file) => {
    if (file && typeof userBody.avatar !== 'string') {
        const avatar = await uploadFileCloudinary(file)
        userBody.avatar = avatar
    }
    const user = await userModel.findById(userId)
    if (!user) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Không tìm thấy người dùng')
    }
    Object.assign(user, userBody)
    return await user.save()
}

const deleteUserById = async userId => {
    const user = await userModel.findById(userId)
    if (!user) {
        throw new ApiError(httpStatus.ALREADY_REPORTED, 'Không tìm thấy người dùng')
    }
    return await user.remove()
}

module.exports = {
    getUserByEmail,
    getDetailUser,
    resetPassword,
    getUsers,
    createUser,
    updateUserById,
    deleteUserById
}
