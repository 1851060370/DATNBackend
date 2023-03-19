const express = require('express')
const router = express.Router()
const verifyToken = require('../middlewares/verifyToken')
const showRoomController = require('../controllers/showRoomController')
const showRowValidator = require('../validations/showRowValidator')

router.get('/', verifyToken, showRoomController.getShowRooms)
router.get('/:id', verifyToken, showRoomController.getShowRoomDetail)
router.post('/', verifyToken, showRowValidator.create(), showRoomController.createShowRoom)
router.put('/:id', verifyToken, showRowValidator.update(), showRoomController.updateshowRoom)
router.delete('/:id', verifyToken, showRoomController.deleteshowRoom)

module.exports = router
