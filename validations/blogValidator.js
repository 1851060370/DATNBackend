const {body} = require('express-validator')

const create = () => {
    return [
        body('title')
            .exists()
            .withMessage('Tiêu đề bài viết là bắt buộc')
            .isLength({min: 10})
            .withMessage('Tiêu đề bài viết không được dưới 10 ký tự')
            .isLength({max: 500})
            .withMessage('Tiêu đề bài viết không được quá 500 ký tự'),
        body('description')
            .exists()
            .withMessage('Mô tả bài viết là bắt buộc')
            .isLength({min: 10})
            .withMessage('Mô tả bài viết không được dưới 10 ký tự')
            .isLength({max: 500})
            .withMessage('Mô tả bài viết không được quá 500 ký tự'),
        body('content').exists().withMessage('Nội dung bài viết là bắt buộc'),
        body('blog_category')
            .exists()
            .withMessage('Loại bài viết là bắt buộc')
            .isString()
            .withMessage('Loại bài viết không hợp lệ'),
        body('author').exists().withMessage('Tác giả bài viết là bắt buộc')
    ]
}

const update = () => {
    return [
        body('title')
            .exists()
            .withMessage('Tiêu đề bài viết là bắt buộc')
            .isLength({min: 10})
            .withMessage('Tiêu đề bài viết không được dưới 10 ký tự')
            .isLength({max: 500})
            .withMessage('Tiêu đề bài viết không được quá 500 ký tự'),
        body('description')
            .exists()
            .withMessage('Mô tả bài viết là bắt buộc')
            .isLength({min: 10})
            .withMessage('Mô tả bài viết không được dưới 10 ký tự')
            .isLength({max: 500})
            .withMessage('Mô tả bài viết không được quá 500 ký tự'),
        body('content').exists().withMessage('Nội dung bài viết là bắt buộc'),
        body('blog_category')
            .exists()
            .withMessage('Loại bài viết là bắt buộc')
            .isString()
            .withMessage('Loại bài viết không hợp lệ'),
        body('author').exists().withMessage('Tác giả bài viết là bắt buộc')
    ]
}

module.exports = {
    create,
    update
}
