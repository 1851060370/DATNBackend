const {body} = require('express-validator')

const create = () => {
    return [
        body('user_name').exists().withMessage('Tên người đánh giá là bắt buộc'),
        body('user_email')
            .exists()
            .withMessage('Email người đánh giá là bắt buộc')
            .isEmail()
            .normalizeEmail()
            .withMessage('Email không đúng định dạng'),
        body('user_phone')
            .exists()
            .withMessage('Số điện thoại là bắt buộc')
            .matches(/(84|0[3|5|7|8|9])+([0-9]{8})\b/g)
            .withMessage('Số điện thoại không đúng'),
        body('content').exists().withMessage('Nội dung đánh giá là bắt buộc'),
        body('stars')
            .exists()
            .withMessage('Đánh giá là bắt buộc')
            .isIn([1, 2, 3, 4, 5])
            .withMessage('Đánh giá không hợp lệ'),
    ]
}

module.exports = {
    create
}
