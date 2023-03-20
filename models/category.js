const mongoose = require('mongoose')

const CategoryModel = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            minLength: 5
        },
        parent_id: {
            type: mongoose.Types.ObjectId,
            default: null
        },
        icon_url: {
            type: String,
            default: null
        }
    },
    {timestamps: true}
)

module.exports = mongoose.model('categories', CategoryModel)
