const httpStatus = require('http-status')

const validateError = require('../utils/validateError')
const productService = require('../services/product.service')
const catchAsync = require('../utils/catchAsync')

const getProducts = catchAsync(async (req, res) => {
    const {page_index, page_size, sort, ...restQuery} = req.query
    const {products, total} = await productService.getProducts(
        page_index,
        page_size,
        sort,
        restQuery
    )
    res.status(200).send({success: true, data: products, page_index, page_size, total})
})

const searchProducts = catchAsync(async (req, res) => {
    const {keyword} = req.query
    if (keyword) {
        const {products} = await productService.searchProducts(keyword)
        res.status(200).send({success: true, data: products})
    } else {
        res.status(200).send({success: true, data: []})
    }
})

const getByDisplay = catchAsync(async (req, res) => {
    const {display} = req.query
    if (display) {
        const products = await productService.getByDisplay(display)
        res.status(200).send({success: true, data: products})
    } else {
        res.status(200).send({success: true, data: []})
    }
})

const getByCategory = catchAsync(async (req, res) => {
    const id = req.params.id
    const {page_index, page_size, sort, stratPrice, endPrice} = req.query
    if (id) {
        const {products, total} = await productService.getByCategory(
            id,
            page_index,
            page_size,
            sort,
            stratPrice,
            endPrice
        )
        res.status(200).send({success: true, data: products, page_index, page_size, total})
    }
})

const getProductDetail = catchAsync(async (req, res) => {
    const {id} = req.params
    const product = await productService.getDetailProduct(id)
    res.status(200).send({success: true, data: product})
})

const createProduct = catchAsync(async (req, res) => {
    const isError = await validateError(req, res)
    if (!isError) {
        const product = await productService.createProduct(req.body, req.files)
        res.status(httpStatus.CREATED).send({success: true, data: product})
    }
})

const updateProduct = catchAsync(async (req, res) => {
    const {id} = req.params
    const isError = await validateError(req, res)
    if (!isError) {
        const product = await productService.updateProduct(id, req.body, req.files)
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
    deleteProduct,
    searchProducts,
    getByDisplay,
    getByCategory
}
