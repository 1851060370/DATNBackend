const httpStatus = require('http-status')

const ApiError = require('../utils/ApiError')
const categoryModel = require('../models/category')

const getCategories = async (page, limit, sort, restQuery) => {
    const sortArr = sort.split(' ')
    const name = restQuery?.name ?? ''
    delete restQuery?.name

    const categories = await categoryModel
        .find({name: {$regex: name, $options: 'i'}, ...restQuery})
        .skip(limit * page - limit)
        .limit(limit)
        .sort({[sortArr[0]]: Number(sortArr[1])})

    const totalCategories = await categoryModel.countDocuments({
        name: {$regex: name, $options: 'i'},
        ...restQuery
    })
    return {categories, total: totalCategories}
}

const getOptionCategories = async id => {
    if(id === 'new') {
        return await categoryModel.find()
    }
    return await categoryModel.find({_id: {$ne: id}})
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
    deleteCategoryById,
    getOptionCategories
}
