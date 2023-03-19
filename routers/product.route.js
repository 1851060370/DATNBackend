const express = require('express')
const router = express.Router()
const verifyToken = require('../middlewares/verifyToken')
const productController = require('../controllers/productController')
const productValidator = require('../validations/productValidator')

router.get('/', verifyToken, productController.getProducts)
router.get('/:id', verifyToken, productController.getProductDetail)
router.post('/', verifyToken, productValidator.create(), productController.createProduct)
router.put('/:id', verifyToken, productValidator.update(), productController.updateProduct)
router.delete('/:id', verifyToken, productController.deleteProduct)

module.exports = router
