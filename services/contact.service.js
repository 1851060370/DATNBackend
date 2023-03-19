const httpStatus = require('http-status')

const ApiError = require('../utils/ApiError')
const contactModel = require('../models/contact')

const getContacts = async (page, limit, sort) => {
    const sortArr = sort.split(' ')

    const contacts = await contactModel
        .find()
        .skip(limit * page - limit)
        .limit(limit)
        .sort({[sortArr[0]]: Number(sortArr[1])})
    return contacts
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
