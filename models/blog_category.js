const mongoose = require('mongoose')
const slug = require('mongoose-slug-generator')
const Schema = mongoose.Schema

mongoose.plugin(slug)

const BlogCategorieModel = Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
            maxLength: 50
        },
        slug: {
            type: String,
            unique: true,
            maxLength: 50,
            slug: 'name'
        }
    },
    {timestamps: true}
)

BlogCategorieModel.index({'$**': 'text'})
module.exports = mongoose.model('blogCategories', BlogCategorieModel)
