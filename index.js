const express = require('express')
const morgan = require('morgan')
const dotenv = require('dotenv')
const cors = require('cors')
const bodyParser = require('body-parser')
const connect = require('./database/connect')

const app = express()
const POST = 6666

// routers
const authRouter = require('./routers/auth.route')
const userRouter = require('./routers/user.route')
const categoryRouter = require('./routers/category.route')
const blogCategoryRouter = require('./routers/blogCategory.route')
const showRoomRouter = require('./routers/showRoom.route')
const contactRouter = require('./routers/contact.route')
const productEvaluateRouter = require('./routers/productEvaluate.route')
const blogRouter = require('./routers/blog.route')
const productRouter = require('./routers/product.route')

// configs
dotenv.config()
app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cors())
app.use(morgan('combined'))

// connect database
connect()

// listen post
var post = process.env.POST || POST
app.listen(post, () => {
    console.log('server runing in post ' + post)
})

// api
app.use('/api/auth', authRouter)
app.use('/api/user', userRouter)
app.use('/api/category', categoryRouter)
app.use('/api/blog-category', blogCategoryRouter)
app.use('/api/show-room', showRoomRouter)
app.use('/api/contact', contactRouter)
app.use('/api/product-evaluate', productEvaluateRouter)
app.use('/api/blog', blogRouter)
app.use('/api/product', productRouter)
