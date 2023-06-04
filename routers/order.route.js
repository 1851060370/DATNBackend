const express = require('express')
const router = express.Router()
const verifyToken = require('../middlewares/verifyToken')
const orderController = require('../controllers/orderController')
const orderValidator = require('../validations/orderValidator')

router.get('/', verifyToken, orderController.getOrders)
router.get('/:id', verifyToken, orderController.getOrderDetail)
router.post('/', orderValidator.create(), orderController.createOrder)
router.put('/change-status/:id', verifyToken, orderController.changeStatus)

module.exports = router
