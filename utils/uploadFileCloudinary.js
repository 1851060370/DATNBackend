const cloudinary = require('cloudinary').v2

// Configuration
cloudinary.config({
    cloud_name: 'dfm8598hf',
    api_key: '328189611294136',
    api_secret: 'No3ipiq9WKZLYMDjLv4nIe-MhqQ'
})

const uploadFileCloudinary = async file => {
    if (file) {
        if (Array.isArray(file)) {
            const urls = []
            for (let i = 0; i < file.length; i++) {
                await cloudinary.uploader.upload(file[i].path, {public_id: file[i].filename})
                const url = await cloudinary.url(file[i].filename, {
                    width: 500,
                    height: 500,
                    Crop: 'fill'
                })
                urls.push(url)
            }
            return urls
        } else {
            await cloudinary.uploader.upload(file.path, {public_id: file.filename})
            const url = await cloudinary.url(file.filename, {
                width: 500,
                height: 500,
                Crop: 'fill'
            })

            return url
        }
    }
    return
}

module.exports = uploadFileCloudinary
