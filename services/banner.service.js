const httpStatus = require('http-status')

const ApiError = require('../utils/ApiError')
const bannerModel = require('../models/banner')
const uploadFileCloudinary = require('../utils/uploadFileCloudinary')

const getBanners = async (page, limit, sort, restQuery) => {
    const sortArr = sort.split(' ')

    const banners = await bannerModel
        .find({...restQuery})
        .skip(limit * page - limit)
        .limit(limit)
        .sort({[sortArr[0]]: Number(sortArr[1])})

    const totalBanners = await bannerModel.countDocuments({
        ...restQuery
    })
    return {banners, total: totalBanners}
}

const getDetailBanner = async id => {
    const banner = await bannerModel.findById(id)
    if (!banner) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Không tìm thấy banner')
    }
    return banner
}

const getByDisplay = async display => {
    const banners = await bannerModel.find({display})
    if (!banners) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Không tìm thấy banner')
    }
    return banners
}

const createBanner = async (body,file) => {
    const image = await uploadFileCloudinary(file)
    body.image = image
    return await bannerModel.create(body)
}

const updateBanner = async (id, body,file) => {
    if (file && typeof body.image !== 'string') {
        const image = await uploadFileCloudinary(file)
        body.image = image
    }
    const banner = await bannerModel.findById(id)
    if (!banner) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Không tìm thấy banner')
    }
    Object.assign(banner, body)
    return await banner.save()
}

const deleteBannerById = async id => {
    const banner = await bannerModel.findById(id)
    if (!banner) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Không tìm thấy banner')
    }
    return await banner.remove()
}

module.exports = {
    getBanners,
    getDetailBanner,
    createBanner,
    updateBanner,
    deleteBannerById,
    getByDisplay
}
