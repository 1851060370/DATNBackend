const httpStatus = require('http-status')

const ApiError = require('../utils/ApiError')
const blogModel = require('../models/blog')

const getBlogs = async (page, limit, sort) => {
    const sortArr = sort.split(' ')

    const blogs = await blogModel
        .find()
        .skip(limit * page - limit)
        .limit(limit)
        .sort({[sortArr[0]]: Number(sortArr[1])})
    return blogs
}

const getDetailBlog = async id => {
    const blog = await blogModel.findById(id)
    if (!blog) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Không tìm thấy bài viết')
    }
    return blog
}

const createBlog = async body => {
    const blog = await blogModel.findOne({title: body.title})
    if (blog) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Tiêu đề bài viết đã tồn tại')
    }
    return await blogModel.create(body)
}

const updateBlog = async (id, body) => {
    const blog = await blogModel.findById(id)
    if (!blog) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Không tìm thấy bài viết')
    }
    Object.assign(blog, body)
    return await blog.save()
}

const deleteBlogById = async id => {
    const blog = await blogModel.findById(id)
    if (!blog) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Không tìm thấy bài viết')
    }
    return await blog.remove()
}

module.exports = {
    getBlogs,
    getDetailBlog,
    createBlog,
    updateBlog,
    deleteBlogById
}
