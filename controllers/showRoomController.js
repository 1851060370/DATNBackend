const httpStatus = require('http-status')

const validateError = require('../utils/validateError')
const showRoomService = require('../services/show_room.service')
const catchAsync = require('../utils/catchAsync')

const getShowRooms = catchAsync(async (req, res) => {
    const {page_index, page_size, sort} = req.query
    const showRooms = await showRoomService.getShowRooms(page_index, page_size, sort)
    res.status(200).send({success: true, data:showRooms})
})

const getShowRoomDetail = catchAsync(async (req, res) => {
    const {id} = req.params
    const showRoom = await showRoomService.getDetailShowRoom(id)
    res.status(200).send({success: true, data: showRoom})
})


const createShowRoom = catchAsync(async (req, res) => {
    const isError = await validateError(req, res)
    if (!isError) {
        const showRoom = await showRoomService.createshowRoom(req.body)
        res.status(httpStatus.CREATED).send({success: true, data:showRoom})
    }
})

const updateshowRoom = catchAsync(async (req, res) => {
    const {id} = req.params
    const isError = await validateError(req, res)
    if (!isError) {
        const showRoom = await showRoomService.updateshowRoom(id, req.body)
        res.status(200).send({success: true, data:showRoom})
    }
})

const deleteshowRoom = catchAsync(async (req, res) => {
    const {id} = req.params
    const isError = await validateError(req, res)
    if (!isError) {
        await showRoomService.deleteshowRoomById(id)
        res.status(httpStatus.NO_CONTENT).send({success: true})
    }
})

module.exports = {
    getShowRooms,
    getShowRoomDetail,
    createShowRoom,
    updateshowRoom,
    deleteshowRoom
}
