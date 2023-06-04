const {body} = require('express-validator')

const create = () => {
    return [
        body('email')
            .exists()
            .withMessage('Email là bắt buộc')
            .isEmail()
            .normalizeEmail()
            .withMessage('Email không đúng định dạng'),
        body('name')
            .exists()
            .withMessage('Tên người dùng là bắt buộc')
            .isLength({min: 4})
            .withMessage('Tên người dùng phải chứa ít nhất 4 ký tự')
            .isLength({max: 30})
            .withMessage('Tên người dùng không được quá 30 ký tự')
            .trim()
            .escape(),
        body('phone')
            .exists()
            .withMessage('Số điện thoại là bắt buộc')
            .matches(/(84|0[3|5|7|8|9])+([0-9]{8})\b/g)
            .withMessage('Số điện thoại không đúng'),
        body('address')
            .exists()
            .withMessage('Địa chỉ là bắt buộc')
            .isLength({min: 10})
            .withMessage('Địa chỉ của bạn không được ít hơn 10 ký tự'),
        body('sex')
            .exists()
            .withMessage('Giới tính là bắt buộc')
            .isIn([0, 1])
            .withMessage('Giới tính không hợp lệ'),
        body('method')
            .exists()
            .withMessage('Phương thức thanh toán là bắt buộc'),
        body('products')
            .exists()
            .withMessage('Sản phẩm là bắt buộc')
            .isArray({min: 1})
            .withMessage('Sản phẩm không được ít hơn 1')
    ]
}

module.exports = {
    create
}
