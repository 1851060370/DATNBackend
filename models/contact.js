const mongoose = require('mongoose')

const ContactModel = mongoose.Schema(
    {
        user_name: {
            type: String,
            required: true,
            minLength: 5,
            maxLength: 255
        },
        user_address: {
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
            required: true,
            minLength: 10,
            maxLength: 11
        },
        content: {
            type: String,
            required: true,
            maxLength: 500
        }
    },
    {timestamps: true}
)

module.exports = mongoose.model('contacts', ContactModel)
