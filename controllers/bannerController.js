const httpStatus = require('http-status')

const bannerService = require('../services/banner.service')
const catchAsync = require('../utils/catchAsync')

const getBanners = catchAsync(async (req, res) => {
    const {page_index, page_size, sort, ...restQuery} = req.query
    const {banners, total} = await bannerService.getBanners(page_index, page_size, sort, restQuery)
    res.status(200).send({success: true, data: banners, page_index, page_size, total})
})

const getBannerDetail = catchAsync(async (req, res) => {
    const {id} = req.params
    const banner = await bannerService.getDetailBanner(id)
    res.status(200).send({success: true, data: banner})
})

const getByDisplay = catchAsync(async (req, res) => {
    const {display} = req.query
    console.log(display);
    const banners = await bannerService.getByDisplay(display)
    res.status(200).send({success: true, data: banners})
})

const createBanner = catchAsync(async (req, res) => {
    const banner = await bannerService.createBanner(req.body,req.file)
    res.status(httpStatus.CREATED).send({success: true, data: banner})
})

const updateBanner = catchAsync(async (req, res) => {
    const {id} = req.params
    const banner = await bannerService.updateBanner(id, req.body,req.file)
    res.status(200).send({success: true, data: banner})
})

const deleteBanner = catchAsync(async (req, res) => {
    const {id} = req.params
    await bannerService.deleteBannerById(id)
    res.status(httpStatus.NO_CONTENT).send({success: true})
})

module.exports = {
    getBanners,
    getBannerDetail,
    createBanner,
    updateBanner,
    deleteBanner,
    getByDisplay
}
