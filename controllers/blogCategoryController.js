const httpStatus = require('http-status')

const validateError = require('../utils/validateError')
const blogCategoryService = require('../services/blogCategory.service')
const catchAsync = require('../utils/catchAsync')

const getCategories = catchAsync(async (req, res) => {
    const {page_index, page_size, sort, ...restQuery} = req.query
    const {blogCategories, total} = await blogCategoryService.getBlogCategories(
        page_index,
        page_size,
        sort,
        restQuery
    )
    res.status(200).send({success: true, data: blogCategories, page_index, page_size, total})
})

const getCategory = catchAsync(async (req, res) => {
    const {id} = req.params
    const category = await blogCategoryService.getDetailBlogCategory(id)
    res.status(200).send({success: true, data: category})
})

const createCategory = catchAsync(async (req, res) => {
    const isError = await validateError(req, res)
    if (!isError) {
        const category = await blogCategoryService.createBlogCategory(req.body)
        res.status(httpStatus.CREATED).send({success: true, data: category})
    }
})

const updateCategory = catchAsync(async (req, res) => {
    const {id} = req.params
    const isError = await validateError(req, res)
    if (!isError) {
        const category = await blogCategoryService.updateBlogCategory(id, req.body)
        res.status(200).send({success: true, data: category})
    }
})

const deleteCategory = catchAsync(async (req, res) => {
    const {id} = req.params
    const isError = await validateError(req, res)
    if (!isError) {
        await blogCategoryService.deleteBlogCategoryById(id)
        res.status(httpStatus.NO_CONTENT).send({success: true})
    }
})

module.exports = {
    getCategories,
    getCategory,
    createCategory,
    updateCategory,
    deleteCategory
}
