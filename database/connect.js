const mongoose = require('mongoose')

const connect = async () => {
    try {
        mongoose.set('strictQuery', true)
        await mongoose.connect(
            `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@oneway.tfjibd3.mongodb.net/?retryWrites=true&w=majority`
        )
        console.log('database connect successfull!')
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

module.exports = connect
