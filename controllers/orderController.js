const httpStatus = require('http-status')

const validateError = require('../utils/validateError')
const orderService = require('../services/order.service')
const catchAsync = require('../utils/catchAsync')

const getOrders = catchAsync(async (req, res) => {
    const {page_index, page_size, sort, ...restQuery} = req.query
    const {orders, total} = await orderService.getOrders(page_index, page_size, sort, restQuery)
    res.status(200).send({success: true, data: orders, page_index, page_size, total})
})

const getOrderDetail = catchAsync(async (req, res) => {
    const {id} = req.params
    const order = await orderService.getDetailOrder(id)
    res.status(200).send({success: true, data: order})
})

const createOrder = catchAsync(async (req, res) => {
    const isError = await validateError(req, res)
    if (!isError) {
        const order = await orderService.createOrder(req.body)
        res.status(httpStatus.CREATED).send({success: true, order})
    }
})

const changeStatus = catchAsync(async (req, res) => {
    const {id} = req.params
    const isError = await validateError(req, res)
    if (!isError) {
        await orderService.changeStatusById(id,req?.body?.status)
        res.status(httpStatus.NO_CONTENT).send({success: true})
    }
})

module.exports = {
    getOrders,
    getOrderDetail,
    createOrder,
    changeStatus
}
