const express = require('express')
const router = express.Router()
const verifyToken = require('../middlewares/verifyToken')
const productEvaluateController = require('../controllers/productEvaluateController')
const productEvaluateValidator = require('../validations/productEvaluateValidator')

router.get('/', verifyToken, productEvaluateController.getProductEvaluates)
router.get('/:id', verifyToken, productEvaluateController.getProductEvaluateDetail)
router.post('/', productEvaluateValidator.create(), productEvaluateController.createProductEvaluate)
router.delete('/:id', verifyToken, productEvaluateController.deleteProductEvaluate)
router.put('/:id', verifyToken, productEvaluateController.changeStatusById)

module.exports = router
