const httpStatus = require('http-status')

const validateError = require('../utils/validateError')
const productEvaluateService = require('../services/productEvaluate.service')
const catchAsync = require('../utils/catchAsync')

const getProductEvaluates = catchAsync(async (req, res) => {
    const {page_index, page_size, sort} = req.query
    const productEvaluates = await productEvaluateService.getProductEvaluates(
        page_index,
        page_size,
        sort
    )
    res.status(200).send({success: true, productEvaluates})
})

const getProductEvaluateDetail = catchAsync(async (req, res) => {
    const {id} = req.params
    const productEvaluate = await productEvaluateService.getDetailProductEvaluate(id)
    res.status(200).send({success: true, productEvaluate})
})

const createProductEvaluate = catchAsync(async (req, res) => {
    const isError = await validateError(req, res)
    if (!isError) {
        const productEvaluate = await productEvaluateService.createProductEvaluate(req.body)
        res.status(httpStatus.CREATED).send({success: true, productEvaluate})
    }
})

const deleteProductEvaluate = catchAsync(async (req, res) => {
    const {id} = req.params
    const isError = await validateError(req, res)
    if (!isError) {
        await productEvaluateService.deleteProductEvaluateById(id)
        res.status(httpStatus.NO_CONTENT).send({success: true})
    }
})

module.exports = {
    getProductEvaluates,
    getProductEvaluateDetail,
    createProductEvaluate,
    deleteProductEvaluate
}
