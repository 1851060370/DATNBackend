const express = require('express')
const router = express.Router()
const verifyToken = require('../middlewares/verifyToken')
const categoryController = require('../controllers/categoryController')
const categoryValidator = require('../validations/categoryValidator')

router.get('/', verifyToken, categoryController.getCategories)
router.get('/menu', categoryController.getMenus)
router.get('/get-options/:id', verifyToken, categoryController.getOptionsCategories)
router.get('/:id', verifyToken, categoryController.getCategoryDetail)
router.post('/', verifyToken, categoryValidator.create(), categoryController.createCategory)
router.put('/:id', verifyToken, categoryValidator.update(), categoryController.updateCategory)
router.delete('/:id', verifyToken, categoryController.deleteCategory)

module.exports = router
