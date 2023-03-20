const httpStatus = require('http-status')

const ApiError = require('../utils/ApiError')
const showRoomModel = require('../models/showRoom')

const getShowRooms = async (page, limit, sort, restQuery) => {
    const sortArr = sort.split(' ')
    const name = restQuery?.name ?? ''
    const address = restQuery?.address ?? ''
    delete restQuery?.name
    delete restQuery?.address

    console.log(name);

    const showRooms = await showRoomModel
        .find({
            name: {$regex: name, $options: 'i'},
            address: {$regex: address, $options: 'i'},
            ...restQuery
        })
        .skip(limit * page - limit)
        .limit(limit)
        .sort({[sortArr[0]]: Number(sortArr[1])})

    const totalShowRooms = await showRoomModel.countDocuments({
        name: {$regex: name, $options: 'i'},
        address: {$regex: address, $options: 'i'},
        ...restQuery
    })

    return {showRooms,total:totalShowRooms}
}

const getDetailShowRoom = async id => {
    const showRoom = await showRoomModel.findById(id)
    if (!showRoom) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Không tìm thấy của hàng')
    }
    return showRoom
}

const createshowRoom = async body => {
    const showRoom = await showRoomModel.findOne({name: body.name})
    if (showRoom) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Tên của hàng đã tồn tại')
    }
    return await showRoomModel.create(body)
}

const updateshowRoom = async (showRoomId, showRoomBody) => {
    const showRoom = await showRoomModel.findById(showRoomId)
    if (!showRoom) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Không tìm thấy của hàng')
    }
    Object.assign(showRoom, showRoomBody)
    return await showRoom.save()
}

const deleteshowRoomById = async showRoomId => {
    const showRoom = await showRoomModel.findById(showRoomId)
    if (!showRoom) {
        throw new ApiError(httpStatus.ALREADY_REPORTED, 'Không tìm thấy của hàng')
    }
    return await showRoom.remove()
}

module.exports = {
    getShowRooms,
    getDetailShowRoom,
    createshowRoom,
    updateshowRoom,
    deleteshowRoomById
}
