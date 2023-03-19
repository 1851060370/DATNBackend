const mongoose = require('mongoose')

const ShowRoomModel = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
        link_map: {
            type: String,
            required: true,
        },
        area: {
            type: String,
            required: true,
            enum:['MIEN-BAC','MIEN-TRUNG','MIEN-NAM']
        }
    },
    {timestamps: true}
)

module.exports = mongoose.model('showRooms', ShowRoomModel)
