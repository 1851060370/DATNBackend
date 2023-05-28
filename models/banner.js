const mongoose = require('mongoose')

const BannerModel = mongoose.Schema(
    {
        image: {
            type: String,
            required: true,
        },
        path: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: false,
        },
        category: {
            type: Number,
            required: true,
            enum:[1,2]
        },
        display: {
            type: Number,
            required: true,
            enum:[1,2,3]
        },
    },
    {timestamps: true}
)

module.exports = mongoose.model('banners', BannerModel)
