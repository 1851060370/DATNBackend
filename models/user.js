const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const UserModel = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            minLength: 5
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        avatar: {
            type: String
        },
        phone: {
            type: String,
            required: true
        }
    },
    {timestamps: true}
)

UserModel.methods.isPasswordMatch = async function (password) {
    const user = this
    const isMatch =  await bcrypt.compare(password, user.password)
    return isMatch
}

// UserModel.pre('save', async next => {
//     const user = this
//     if (user.isModified('password')) {
//         user.password = await bcrypt.hash(user.password, 8)
//     }
//     next()
// })

const User = mongoose.model('users', UserModel)
module.exports = User
