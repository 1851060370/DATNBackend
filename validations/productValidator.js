const {body} = require('express-validator')

const create = () => {
    return [
        body('name')
            .exists()
            .withMessage('Tên sản phẩm là bắt buộc')
            .isLength({min: 5})
            .withMessage('Tên sản phẩm không được dưới 5 ký tự')
            .isLength({max: 255})
            .withMessage('Tên sản phẩm không được quá 255 ký tự'),
        body('options')
            .exists()
            .withMessage('Lựa chọn sản phẩm là bắt buộc')
            .isArray({min: 1})
            .withMessage('Lựa chọn sản phẩm không được ít hơn 1'),
        body('colors')
            .exists()
            .withMessage('Màu sản phẩm là bắt buộc')
            .isArray({min: 1})
            .withMessage('Màu sản phẩm không được ít hơn 1'),
        body('category')
            .exists()
            .withMessage('Loại sản phẩm là bắt buộc')
            .isString()
            .withMessage('Loại sản phẩm không hợp lệ'),
    ]
}

const update = () => {
    return [
        body('name')
            .exists()
            .withMessage('Tên sản phẩm là bắt buộc')
            .isLength({min: 5})
            .withMessage('Tên sản phẩm không được dưới 5 ký tự')
            .isLength({max: 255})
            .withMessage('Tên sản phẩm không được quá 255 ký tự'),
        body('options')
            .exists()
            .withMessage('Lựa chọn sản phẩm là bắt buộc')
            .isArray({min: 1})
            .withMessage('Lựa chọn sản phẩm không được ít hơn 1'),
        body('colors')
            .exists()
            .withMessage('Màu sản phẩm là bắt buộc')
            .isArray({min: 1})
            .withMessage('Màu sản phẩm không được ít hơn 1'),
        body('category')
            .exists()
            .withMessage('Loại sản phẩm là bắt buộc')
            .isString()
            .withMessage('Loại sản phẩm không hợp lệ'),
    ]
}

module.exports = {
    create,
    update
}
