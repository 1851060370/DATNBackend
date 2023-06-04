const express = require('express')
const router = express.Router()
const verifyToken = require('../middlewares/verifyToken')
const contactController = require('../controllers/contactController')
const contactValidator = require('../validations/contactValidator')

router.get('/', verifyToken, contactController.getContacts)
router.get('/:id', verifyToken, contactController.getContactDetail)
router.post('/', contactValidator.create(), contactController.createContact)
router.delete('/:id', verifyToken, contactController.deleteContact)

module.exports = router
