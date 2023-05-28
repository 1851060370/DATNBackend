const httpStatus = require('http-status')

const validateError = require('../utils/validateError')
const blogService = require('../services/blog.service')
const catchAsync = require('../utils/catchAsync')

const getBlogs = catchAsync(async (req, res) => {
    const {page_index, page_size, sort,...restQuery} = req.query
    const {blogs,total} = await blogService.getBlogs(page_index, page_size, sort,restQuery)
    res.status(200).send({success: true, data: blogs,page_index, page_size,total})
})

const getBlogDetail = catchAsync(async (req, res) => {
    const {id} = req.params
    const blog = await blogService.getDetailBlog(id)
    res.status(200).send({success: true, data: blog})
})

const getPopularBlogs = catchAsync(async (req, res) => {
    const blogs = await blogService.getPopularBlogs()
    res.status(200).send({success: true, data: blogs})
})

const createBlog = catchAsync(async (req, res) => {
    const isError = await validateError(req, res)
    if (!isError) {
        const blog = await blogService.createBlog(req.body,req.file)
        res.status(httpStatus.CREATED).send({success: true, data: blog})
    }
})

const updateBlog = catchAsync(async (req, res) => {
    const {id} = req.params
    const isError = await validateError(req, res)
    if (!isError) {
        const blog = await blogService.updateBlog(id, req.body,req.file)
        res.status(200).send({success: true, data: blog})
    }
})

const deleteBlog = catchAsync(async (req, res) => {
    const {id} = req.params
    const isError = await validateError(req, res)
    if (!isError) {
        await blogService.deleteBlogById(id)
        res.status(httpStatus.NO_CONTENT).send({success: true})
    }
})

module.exports = {
    getBlogs,
    getBlogDetail,
    createBlog,
    updateBlog,
    deleteBlog,
    getPopularBlogs
}
