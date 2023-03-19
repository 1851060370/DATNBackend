const {body} = require('express-validator')

const login = () => {
    return [
        body('email').isEmail().normalizeEmail().withMessage('Email không đúng định dạng').exists(),
        body('password')
            .isLength({min: 8})
            .withMessage('Mật khẩu phải trên 8 ký tự')
            .matches(/\d/)
            .withMessage('Mật khẩu phải có ít nhất 1 số')
            .exists()
    ]
}

const register = () => {
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
        body('password')
            .exists()
            .withMessage('Mật khẩu là bắt buộc')
            .isLength({min: 8})
            .withMessage('Mật khẩu phải trên 8 ký tự')
            .matches(/\d/)
            .withMessage('Mật khẩu phải có ít nhất 1 số')
    ]
}

module.exports = {
    login,
    register
}
