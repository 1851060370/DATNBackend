const express = require('express')
const router = express.Router()
const verifyToken = require('../middlewares/verifyToken')
const blogCategoryController = require('../controllers/blogCategoryController')
const blogCategoryValidator = require('../validations/blogCategoryValidator')

router.get('/', verifyToken, blogCategoryController.getCategories)
router.get('/:id', verifyToken, blogCategoryController.getCategory)
router.post('/', verifyToken, blogCategoryValidator.create(), blogCategoryController.createCategory)
router.put('/:id', verifyToken, blogCategoryValidator.update(), blogCategoryController.updateCategory)
router.delete('/:id', verifyToken, blogCategoryController.deleteCategory)

module.exports = router
