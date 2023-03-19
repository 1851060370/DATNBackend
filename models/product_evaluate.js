const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProductEvaluateModel = Schema(
    {
        productId: {
            type: String,
            required: true
        },
        user_name: {
            type: String,
            required: true,
            maxLength: 255
        },
        user_email: {
            type: String,
            required: true,
            maxLength: 255
        },
        user_phone: {
            type: String,
            required: false,
            maxLength: 15
        },
        content: {
            type: String,
            required: true
        },
        stars: {
            type: Number,
            required: true,
            enum: [1, 2, 3, 4, 5]
        },
        display: {
            type: Boolean,
            enum: [0, 1],
            default: 0
        }
    },
    {timestamps: true}
)

module.exports = mongoose.model('productEvaluates', ProductEvaluateModel)
