const {body} = require('express-validator')

const create = () => {
    return [
        body('name')
            .exists()
            .withMessage('Tên loại là bắt buộc')
            .isLength({min: 5})
            .withMessage('Tên loại không được dưới 5 ký tự')
            .isLength({max: 50})
            .withMessage('Tên loại không được quá 50 ký tự')
    ]
}

const update = () => {
    return [
        body('name')
            .exists()
            .withMessage('Tên loại là bắt buộc')
            .isLength({min: 4})
            .withMessage('Tên loại không được dưới 4 ký tự')
            .isLength({max: 50})
            .withMessage('Tên loại không được quá 50 ký tự')
    ]
}

module.exports = {
    create,
    update
}
