const httpStatus = require('http-status')

const ApiError = require('../utils/ApiError')
const uploadFileCloudinary = require('../utils/uploadFileCloudinary')
const productModel = require('../models/product')
const categoryModel = require('../models/category')
const {default: mongoose} = require('mongoose')

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

const searchProducts = async keyword => {
    const products = await productModel.find({name: {$regex: keyword, $options: 'i'}})
    return {products}
}

const getByDisplay = async display => {
    const products = await productModel.find({[display]: true}).limit(10)
    return products
}

const getByCategory = async (category_id, page, limit, sort, stratPrice, endPrice) => {
    const sortArr = sort.split(' ')
    const categories = [category_id]
    const childrenCategories = await categoryModel.find({parent_id: category_id})
    if (childrenCategories && childrenCategories.length > 0) {
        childrenCategories.forEach(category => {
            categories.push(category._id?.toString())
        })
        const childrenCategories2 = await Promise.all(
            childrenCategories.map(i => {
                return categoryModel.find({parent_id: i?._id})
            })
        )
        childrenCategories2.flat().forEach(category => {
            categories.push(category._id?.toString())
        })
    }

    const categoriesObjectId = categories?.map(category => mongoose.Types.ObjectId(category))
    const products = await productModel
        .find({category: {$in: categoriesObjectId}, price: {$gte: stratPrice, $lt: endPrice}})
        .skip(limit * page - limit)
        .limit(limit)
        .sort({[sortArr[0]]: Number(sortArr[1])})

    const total = await productModel.countDocuments({
        category: {$in: categoriesObjectId},
        price: {$gte: stratPrice, $lt: endPrice}
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
    deleteProductById,
    searchProducts,
    getByDisplay,
    getByCategory
}
