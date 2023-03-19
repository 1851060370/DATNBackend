const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const Schema = mongoose.Schema;

mongoose.plugin(slug);

const BlogModel = Schema(
    {
        title: {
            type: String,
            required: true,
            minLength: 10,
            maxLength: 500,
            unique: true,
        },
        description: {
            type: String,
            required: true,
            minLength: 10,
            maxLength: 500,
        },
        content: {
            type: String,
            required: true,
        },
        blog_category: {
            type: String,
            required: true,
            ref:'blogCategories'
        },
        image: {
            type: String,
            required: true,
        },
        author: {
            type: String,
            required: true,
            maxLength: 100,
        },
        slug: {
            type: String,
            slug: 'title',
            maxLength: 255,
        },
        isPopular: {
            type: Number,
            required: false,
            default:0
        },
    },
    {timestamps: true},
);

BlogModel.index({'$**': 'text'})
module.exports = mongoose.model('blogs', BlogModel);