const express = require('express')
const router = express.Router()
const upload = require('../middlewares/upload')
const verifyToken = require('../middlewares/verifyToken')
const productController = require('../controllers/productController')
const productValidator = require('../validations/productValidator')

router.get('/', verifyToken, productController.getProducts)
router.get('/search', verifyToken, productController.searchProducts)
router.get('/by-display', verifyToken, productController.getByDisplay)
router.get('/:id', verifyToken, productController.getProductDetail)
router.post('/', verifyToken,upload.array('images[]'), productValidator.create(), productController.createProduct)
router.put('/:id', verifyToken,upload.array('images[]'), productValidator.update(), productController.updateProduct)
router.delete('/:id', verifyToken, productController.deleteProduct)

module.exports = router
