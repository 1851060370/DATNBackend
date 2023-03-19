const express = require('express')
const router = express.Router()
const verifyToken = require('../middlewares/verifyToken')
const authController = require('../controllers/authController')
const authValidator = require('../validations/authValidator')

router.post('/login', authValidator.login(), authController.login)
router.post('/register', authValidator.register(), authController.register)
router.put('/reset-password', verifyToken,authValidator.register(), authController.register)

module.exports = router
