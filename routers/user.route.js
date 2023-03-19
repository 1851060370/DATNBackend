const express = require('express')
const router = express.Router()
const verifyToken = require('../middlewares/verifyToken')
const userController = require('../controllers/userController')
const userValidator = require('../validations/userValidator')

router.get('/', verifyToken, userController.getUsers)
router.get('/:id', verifyToken, userController.getUserDetail)
router.post('/', verifyToken, userValidator.create(), userController.createUser)
router.put('/:id', verifyToken, userValidator.update(), userController.updateUser)
router.delete('/:id', verifyToken, userController.deleteUser)
router.put(
    '/reset-password',
    verifyToken,
    userValidator.resetPassword(),
    userController.resetPassword
)

module.exports = router
