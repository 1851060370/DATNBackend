const cloudinary = require('cloudinary').v2

// Configuration
cloudinary.config({
    cloud_name: 'dajfqgjix',
    api_key: '446566741976387',
    api_secret: 'HtumrTsfOYBx_MfE8ICKYpegsIE'
})

const uploadFileCloudinary = async file => {
    if (file) {
        await cloudinary.uploader.upload(file.path, {public_id: file.filename})
        const url = await cloudinary.url(file.filename, {
            width: 500,
            height: 500,
            Crop: 'fill'
        })

        return url
    }
    return
}

module.exports = uploadFileCloudinary
