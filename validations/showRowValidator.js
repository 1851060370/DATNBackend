const {body} = require('express-validator')

const create = () => {
    return [
        body('name')
            .exists()
            .withMessage('Tên của hàng là bắt buộc')
            .isLength({min: 5})
            .withMessage('Tên của hàng không được dưới 5 ký tự')
            .isLength({max: 50})
            .withMessage('Tên của hàng không được quá 50 ký tự'),
        body('address')
            .exists()
            .withMessage('Địa chỉ của hàng là bắt buộc')
            .isLength({min: 5})
            .withMessage('Địa chỉ của hàng không được dưới 5 ký tự')
            .isLength({max: 50})
            .withMessage('Địa chỉ của hàng không được quá 50 ký tự'),
        body('link_map').exists().withMessage('Tên của hàng là bắt buộc'),
        body('area')
            .exists()
            .withMessage('Khu vực của hàng là bắt buộc')
            .isIn(['MIEN-BAC','MIEN-TRUNG','MIEN-NAM'])
            .withMessage('Khu vực của hàng không đúng định dạng')
    ]
}

const update = () => {
    return [
        body('name')
            .exists()
            .withMessage('Tên của hàng là bắt buộc')
            .isLength({min: 5})
            .withMessage('Tên của hàng không được dưới 5 ký tự')
            .isLength({max: 50})
            .withMessage('Tên của hàng không được quá 50 ký tự'),
        body('address')
            .exists()
            .withMessage('Địa chỉ của hàng là bắt buộc')
            .isLength({min: 5})
            .withMessage('Địa chỉ của hàng không được dưới 5 ký tự')
            .isLength({max: 50})
            .withMessage('Địa chỉ của hàng không được quá 50 ký tự'),
        body('link_map').exists().withMessage('Tên của hàng là bắt buộc'),
        body('area')
            .exists()
            .withMessage('Khu vực của hàng là bắt buộc')
            .isIn(['MIEN-BAC','MIEN-TRUNG','MIEN-NAM'])
            .withMessage('Khu vực của hàng không đúng định dạng')
    ]
}

module.exports = {
    create,
    update
}
