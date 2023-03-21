const httpStatus = require('http-status')

const ApiError = require('../utils/ApiError')
const productEvaluateModel = require('../models/product_evaluate')

const getProductEvaluates = async (page, limit, sort, restQuery) => {
    const sortArr = sort.split(' ')
    const user_email = restQuery?.user_email ?? ''
    delete restQuery?.user_email

    const productEvaluates = await productEvaluateModel
        .find({
            user_email: {$regex: user_email, $options: 'i'},
            ...restQuery
        })
        .skip(limit * page - limit)
        .limit(limit)
        .sort({[sortArr[0]]: Number(sortArr[1])})

    const total = await productEvaluateModel.countDocuments({
        user_email: {$regex: user_email, $options: 'i'},
        ...restQuery
    })

    return {productEvaluates, total}
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
