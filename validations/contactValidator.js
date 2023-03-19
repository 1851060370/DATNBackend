const {body} = require('express-validator')

const create = () => {
    return [
        body('user_name').exists().withMessage('Tên người liên hệ là bắt buộc'),
        body('user_address').exists().withMessage('Địa chỉ người liên hệ là bắt buộc'),
        body('user_email')
            .exists()
            .withMessage('Email người liên hệ là bắt buộc')
            .isEmail()
            .normalizeEmail()
            .withMessage('Email không đúng định dạng'),
        body('user_phone')
            .exists()
            .withMessage('Số điện thoại là bắt buộc')
            .matches(/(84|0[3|5|7|8|9])+([0-9]{8})\b/g)
            .withMessage('Số điện thoại không đúng'),
        body('content').exists().withMessage('Nội dung liên hệ là bắt buộc')
    ]
}

module.exports = {
    create
}
