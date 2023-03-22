const httpStatus = require('http-status')

const ApiError = require('../utils/ApiError')
const orderModel = require('../models/order')

const getOrders = async (page, limit, sort, restQuery) => {
    const sortArr = sort.split(' ')
    const name = restQuery?.name ?? ''
    const email = restQuery?.email ?? ''
    delete restQuery?.name
    delete restQuery?.email

    const orders = await orderModel
        .find({
            name: {$regex: name, $options: 'i'},
            email: {$regex: email, $options: 'i'},
            ...restQuery
        })
        .skip(limit * page - limit)
        .limit(limit)
        .sort({[sortArr[0]]: Number(sortArr[1])})

    const total = await orderModel.countDocuments({
        name: {$regex: name, $options: 'i'},
        email: {$regex: email, $options: 'i'},
        ...restQuery
    })

    return {orders, total}
}

const getDetailOrder = async id => {
    const order = await orderModel.findById(id)
    if (!order) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Không tìm thấy đơn hàng')
    }
    return order
}

const createOrder = async body => {
    return await orderModel.create(body)
}

const changeStatusById = async (id, status) => {
    const order = await orderModel.findById(id)
    if (!order) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Không tìm thấy đơn hàng')
    }
    return await order.update({status})
}

module.exports = {
    getOrders,
    getDetailOrder,
    createOrder,
    changeStatusById
}
