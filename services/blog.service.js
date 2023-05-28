const httpStatus = require('http-status')

const ApiError = require('../utils/ApiError')
const blogModel = require('../models/blog')
const uploadFileCloudinary = require('../utils/uploadFileCloudinary')

const getBlogs = async (page, limit, sort, restQuery) => {
    const sortArr = sort.split(' ')
    const author = restQuery?.author ?? ''
    const title = restQuery?.title ?? ''
    delete restQuery?.author
    delete restQuery?.title

    const blogs = await blogModel
        .find({
            author: {$regex: author, $options: 'i'},
            title: {$regex: title, $options: 'i'},
            ...restQuery
        })
        .skip(limit * page - limit)
        .limit(limit)
        .sort({[sortArr[0]]: Number(sortArr[1])})

    const total = await blogModel.countDocuments({
        author: {$regex: author, $options: 'i'},
        title: {$regex: title, $options: 'i'},
        ...restQuery
    })

    return {blogs, total}
}

const getDetailBlog = async id => {
    const blog = await blogModel.findById(id)
    if (!blog) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Không tìm thấy bài viết')
    }
    return blog
}

const getPopularBlogs = async () => {
    const blogs = await blogModel.find({isPopular: 1}).limit(2)
    if (!blogs) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Không tìm thấy bài viết')
    }
    return blogs
}

const createBlog = async (body, file) => {
    const blog = await blogModel.findOne({title: body.title})
    const image = await uploadFileCloudinary(file)
    if (blog) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Tiêu đề bài viết đã tồn tại')
    }
    body.image = image
    return await blogModel.create(body)
}

const updateBlog = async (id, body, file) => {
    if (file && typeof body.image !== 'string') {
        const image = await uploadFileCloudinary(file)
        body.image = image
    }
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
    deleteBlogById,
    getPopularBlogs
}
