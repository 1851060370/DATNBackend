const httpStatus = require('http-status')

const userService = require('../services/user.service')
const validateError = require('../utils/validateError')
const catchAsync = require('../utils/catchAsync')

const resetPassword = catchAsync(async (req, res) => {
    const {email, oldPassword} = req.body
    const isError = await validateError(req, res)
    if (!isError) {
        await userService.resetPassword(email, oldPassword)
        res.status(httpStatus.NO_CONTENT).send()
    }
})

const getUsers = catchAsync(async (req, res) => {
    const {page_index, page_size, sort} = req.query
    const users = await userService.getUsers(page_index,page_size,sort)
    res.status(200).send({success: true, data: users})
})

const getUserDetail = catchAsync(async (req, res) => {
    const {id} = req.params
    const user = await userService.getDetailUser(id)
    res.status(200).send({success: true, data: user})
})

const createUser = catchAsync(async (req, res) => {
    const isError = await validateError(req, res)
    if (!isError) {
        const user = await userService.createUser(req.body)
        res.status(httpStatus.CREATED).send({success: true, data:user})
    }
})

const updateUser = catchAsync(async (req, res) => {
    const {id} = req.params
    const isError = await validateError(req, res)
    if (!isError) {
        const user = await userService.updateUserById(id, req.body)
        res.status(200).send({success: true, data:user})
    }
})

const deleteUser = catchAsync(async (req, res) => {
    const {id} = req.params
    const isError = await validateError(req, res)
    if (!isError) {
        await userService.deleteUserById(id)
        res.status(httpStatus.NO_CONTENT).send({success: true})
    }
})

module.exports = {
    resetPassword,
    getUsers,
    getUserDetail,
    createUser,
    updateUser,
    deleteUser
}
