const httpStatus = require('http-status')

const ApiError = require('../utils/ApiError')
const uploadFileCloudinary = require('../utils/uploadFileCloudinary')
const productModel = require('../models/product')

const getProducts = async (page, limit, sort, restQuery) => {
    const sortArr = sort.split(' ')
    const name = restQuery?.name ?? ''
    delete restQuery?.name

    const products = await productModel
        .find({name: {$regex: name, $options: 'i'}, ...restQuery})
        .skip(limit * page - limit)
        .limit(limit)
        .sort({[sortArr[0]]: Number(sortArr[1])})

    const total = await productModel.countDocuments({
        name: {$regex: name, $options: 'i'},
        ...restQuery
    })
    return {products, total}
}

const getDetailProduct = async id => {
    const product = await productModel.findById(id)
    if (!product) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Không tìm thấy sản phẩm')
    }
    return product
}

const createProduct = async (body, files) => {
    const product = await productModel.findOne({name: body.name})
    if (product) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Tên sản phẩm đã tồn tại')
    }
    if (files) {
        const images = await uploadFileCloudinary(files)
        body.images = images
    }
    const colors = body.colors.map(color => JSON.parse(color))
    const options = body.options.map(option => JSON.parse(option))
    const parameters = body.parameters.map(parameter => JSON.parse(parameter))

    body.colors = colors
    body.options = options
    body.parameters = parameters
    return await productModel.create(body)
}

const updateProduct = async (id, body, files) => {
    const product = await productModel.findById(id)
    if (!product) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Không tìm thấy sản phẩm')
    }
    if (files.length > 0) {
        const images = await uploadFileCloudinary(files)
        body.images = images
    }
    const colors = body.colors.map(color => JSON.parse(color))
    const options = body.options.map(option => JSON.parse(option))
    const parameters = body.parameters.map(parameter => JSON.parse(parameter))

    body.colors = colors
    body.options = options
    body.parameters = parameters
    Object.assign(product, body)
    return await product.save()
}

const deleteProductById = async id => {
    const product = await productModel.findById(id)
    if (!product) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Không tìm thấy sản phẩm')
    }
    return await product.remove()
}

module.exports = {
    getProducts,
    getDetailProduct,
    createProduct,
    updateProduct,
    deleteProductById
}
