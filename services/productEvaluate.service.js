const httpStatus = require('http-status')

const ApiError = require('../utils/ApiError')
const productEvaluateModel = require('../models/product_evaluate')

const getProductEvaluates = async (page, limit, sort) => {
    const sortArr = sort.split(' ')

    const productEvaluates = await productEvaluateModel
        .find()
        .skip(limit * page - limit)
        .limit(limit)
        .sort({[sortArr[0]]: Number(sortArr[1])})
    return productEvaluates
}

const getDetailProductEvaluate = async id => {
    const productEvaluate = await productEvaluateModel.findById(id)
    if (!productEvaluate) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Không tìm thấy đánh giá')
    }
    return productEvaluate
}

const createProductEvaluate = async body => {
    return await productEvaluateModel.create(body)
}

const deleteProductEvaluateById = async id => {
    const productEvaluate = await productEvaluateModel.findById(id)
    if (!productEvaluate) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Không tìm thấy đánh giá')
    }
    return await productEvaluate.remove()
}

module.exports = {
    getProductEvaluates,
    createProductEvaluate,
    deleteProductEvaluateById,
    getDetailProductEvaluate
}
