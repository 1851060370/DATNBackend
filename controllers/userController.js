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
    const {page_index, page_size, sort,...restQuery} = req.query
    const {users,totalUsers} = await userService.getUsers(page_index, page_size, sort,restQuery)
    res.status(200).send({data: users, page_index, page_size, total: totalUsers})
})

const getUserDetail = catchAsync(async (req, res) => {
    const {id} = req.params
    const user = await userService.getDetailUser(id)
    res.status(200).send({success: true, data: user})
})

const createUser = catchAsync(async (req, res) => { 
    const isError = await validateError(req, res)
    if (!isError) {
        const user = await userService.createUser(req.body,req.file)
        res.status(httpStatus.CREATED).send({success: true, data: user})
    }
})

const updateUser = catchAsync(async (req, res) => {
    const {id} = req.params
    const isError = await validateError(req, res)
    if (!isError) {
        const user = await userService.updateUserById(id, req.body,req.file)
        res.status(200).send({success: true, data: user})
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
