const {body} = require('express-validator')

const resetPassword = () => {
    return [
        body('email').exists().withMessage('Email is required'),
        body('oldPassword').exists().withMessage('Old password is required'),
        body('newPassword')
            .exists()
            .withMessage('New password is required')
            .isLength({min: 8})
            .withMessage('Mật khẩu phải trên 8 ký tự')
    ]
}

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
        body('password')
            .exists()
            .withMessage('Mật khẩu là bắt buộc')
            .isLength({min: 8})
            .withMessage('Mật khẩu phải trên 8 ký tự')
            .matches(/\d/)
            .withMessage('Mật khẩu phải có ít nhất 1 số')
    ]
}

const update = () => {
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
            .withMessage('Số điện thoại không đúng')
    ]
}

module.exports = {
    resetPassword,
    create,
    update
}
