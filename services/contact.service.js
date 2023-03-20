const httpStatus = require('http-status')

const ApiError = require('../utils/ApiError')
const contactModel = require('../models/contact')

const getContacts = async (page, limit, sort, restQuery) => {
    const sortArr = sort.split(' ')
    const user_name = restQuery?.user_name ?? ''
    const user_email = restQuery?.user_email ?? ''
    const user_phone = restQuery?.user_phone ?? ''

    const contacts = await contactModel
        .find({
            user_name: {$regex: user_name, $options: 'i'},
            user_email: {$regex: user_email, $options: 'i'},
            user_phone: {$regex: user_phone, $options: 'i'}
        })
        .skip(limit * page - limit)
        .limit(limit)
        .sort({[sortArr[0]]: Number(sortArr[1])})

    const totalContacts = await contactModel.countDocuments({
        user_name: {$regex: user_name, $options: 'i'},
        user_email: {$regex: user_email, $options: 'i'},
        user_phone: {$regex: user_phone, $options: 'i'}
    })

    return {contacts, total: totalContacts}
}

const getDetailContact = async id => {
    const contact = await contactModel.findById(id)
    if (!contact) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Không tìm thấy liên hệ')
    }
    return contact
}

const createContact = async body => {
    return await contactModel.create(body)
}

const deleteContactById = async id => {
    const contact = await contactModel.findById(id)
    if (!contact) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Không tìm thấy liên hệ')
    }
    return await contact.remove()
}

module.exports = {
    getContacts,
    getDetailContact,
    createContact,
    deleteContactById
}
