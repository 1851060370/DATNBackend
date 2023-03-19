const httpStatus = require('http-status')

const validateError = require('../utils/validateError')
const categoryService = require('../services/category.service')
const catchAsync = require('../utils/catchAsync')

const getCategories = catchAsync(async (req, res) => {
    const {page_index, page_size, sort} = req.query
    const categories = await categoryService.getCategories(page_index, page_size, sort)
    res.status(200).send({success: true, data: categories})
})

const getCategoryDetail = catchAsync(async (req, res) => {
    const {id} = req.params
    const category = await categoryService.getDetailCategory(id)
    res.status(200).send({success: true, data: category})
})

const createCategory = catchAsync(async (req, res) => {
    const isError = await validateError(req, res)
    if (!isError) {
        const category = await categoryService.createCategory(req.body)
        res.status(httpStatus.CREATED).send({success: true, data: category})
    }
})

const updateCategory = catchAsync(async (req, res) => {
    const {id} = req.params
    const isError = await validateError(req, res)
    if (!isError) {
        const category = await categoryService.updateCategory(id, req.body)
        res.status(200).send({success: true, data: category})
    }
})

const deleteCategory = catchAsync(async (req, res) => {
    const {id} = req.params
    const isError = await validateError(req, res)
    if (!isError) {
        await categoryService.deleteCategoryById(id)
        res.status(httpStatus.NO_CONTENT).send({success: true})
    }
})

module.exports = {
    getCategories,
    getCategoryDetail,
    createCategory,
    updateCategory,
    deleteCategory
}
