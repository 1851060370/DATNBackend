const express = require('express')
const router = express.Router()
const upload = require('../middlewares/upload')
const verifyToken = require('../middlewares/verifyToken')
const bannerController = require('../controllers/bannerController')

router.get('/', verifyToken, bannerController.getBanners)
router.get('/by-display', bannerController.getByDisplay)
router.get('/:id', verifyToken, bannerController.getBannerDetail)
router.post('/', verifyToken,upload.single('image'), bannerController.createBanner)
router.put('/:id', verifyToken,upload.single('image'), bannerController.updateBanner)
router.delete('/:id', verifyToken, bannerController.deleteBanner)

module.exports = router
