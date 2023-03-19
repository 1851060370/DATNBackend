const express = require('express')
const router = express.Router()
const verifyToken = require('../middlewares/verifyToken')
const blogController = require('../controllers/blogController')
const blogValidator = require('../validations/blogValidator')

router.get('/', verifyToken, blogController.getBlogs)
router.get('/:id', verifyToken, blogController.getBlogDetail)
router.post('/', verifyToken, blogValidator.create(), blogController.createBlog)
router.put('/:id', verifyToken, blogValidator.update(), blogController.updateBlog)
router.delete('/:id', verifyToken, blogController.deleteBlog)

module.exports = router
