const httpStatus = require('http-status')

const validateError = require('../utils/validateError')
const productService = require('../services/product.service')
const catchAsync = require('../utils/catchAsync')

const getProducts = catchAsync(async (req, res) => {
    const {page_index, page_size, sort, ...restQuery} = req.query
    const products = await productService.getProducts(page_index, page_size, sort, restQuery)
    res.status(200).send({success: true, data: products, page_index, total: products.length})
})

const getProductDetail = catchAsync(async (req, res) => {
    const {id} = req.params
    const product = await productService.getDetailProduct(id)
    res.status(200).send({success: true, data: product})
})

const createProduct = catchAsync(async (req, res) => {
    const isError = await validateError(req, res)
    if (!isError) {
        const product = await productService.createProduct(req.body)
        res.status(httpStatus.CREATED).send({success: true, data: product})
    }
})

const updateProduct = catchAsync(async (req, res) => {
    const {id} = req.params
    const isError = await validateError(req, res)
    if (!isError) {
        const product = await productService.updateProduct(id, req.body)
        res.status(200).send({success: true, data: product})
    }
})

const deleteProduct = catchAsync(async (req, res) => {
    const {id} = req.params
    const isError = await validateError(req, res)
    if (!isError) {
        await productService.deleteProductById(id)
        res.status(httpStatus.NO_CONTENT).send({success: true})
    }
})

module.exports = {
    getProducts,
    getProductDetail,
    createProduct,
    updateProduct,
    deleteProduct
}
