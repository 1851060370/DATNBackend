const httpStatus = require('http-status')

const ApiError = require('../utils/ApiError')
const categoryModel = require('../models/category')

const getCategories = async (page, limit, sort) => {
    const sortArr = sort.split(' ')

    const categories = await categoryModel
        .find()
        .skip(limit * page - limit)
        .limit(limit)
        .sort({[sortArr[0]]: Number(sortArr[1])})
    return categories
}

const getDetailCategory = async id => {
    const category = await categoryModel.findById(id)
    if (!category) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Không tìm thấy loại')
    }
    return category
}

const createCategory = async body => {
    const category = await categoryModel.findOne({name: body.name})
    if (category) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Tên loại đã tồn tại')
    }
    return await categoryModel.create(body)
}

const updateCategory = async (id, body) => {
    const category = await categoryModel.findById(id)
    if (!category) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Không tìm thấy loại')
    }
    Object.assign(category, body)
    return await category.save()
}

const deleteCategoryById = async id => {
    const category = await categoryModel.findById(id)
    if (!category) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Không tìm thấy loại')
    }
    return await category.remove()
}

module.exports = {
    getCategories,
    getDetailCategory,
    createCategory,
    updateCategory,
    deleteCategoryById
}
