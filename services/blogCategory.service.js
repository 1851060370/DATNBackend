const httpStatus = require('http-status')

const ApiError = require('../utils/ApiError')
const blogCategoryModel = require('../models/blog_category')

const getBlogCategories = async (page, limit, sort, restQuery) => {
    const sortArr = sort.split(' ')
    const name = restQuery?.name ?? ''
    delete restQuery?.name

    const blogCategories = await blogCategoryModel
        .find({name: {$regex: name, $options: 'i'}, ...restQuery})
        .skip(limit * page - limit)
        .limit(limit)
        .sort({[sortArr[0]]: Number(sortArr[1])})

    const totalCategories = await blogCategoryModel.countDocuments({
        name: {$regex: name, $options: 'i'},
        ...restQuery
    })
    return {blogCategories, total: totalCategories}
}

const getDetailBlogCategory = async id => {
    const blogCategory = await blogCategoryModel.findById(id)
    if (!blogCategory) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Không tìm thấy loại bài viết')
    }
    return blogCategory
}

const createBlogCategory = async body => {
    const blogCategory = await blogCategoryModel.findOne({name: body.name})
    if (blogCategory) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Tên loại bài viết đã tồn tại')
    }
    return await blogCategoryModel.create(body)
}

const updateBlogCategory = async (id, body) => {
    const blogCategory = await blogCategoryModel.findById(id)

    if (!blogCategory) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Không tìm thấy loại bài viết')
    }

    Object.assign(blogCategory, body)
    return await blogCategory.save()
}

const deleteBlogCategoryById = async id => {
    const blogCategory = await blogCategoryModel.findById(id)
    if (!blogCategory) {
        throw new ApiError(httpStatus.ALREADY_REPORTED, 'Không tìm thấy loại bài viết')
    }
    return await blogCategory.remove()
}

module.exports = {
    getBlogCategories,
    getDetailBlogCategory,
    createBlogCategory,
    updateBlogCategory,
    deleteBlogCategoryById
}
