const httpStatus = require('http-status')

const validateError = require('../utils/validateError')
const contactService = require('../services/contact.service')
const catchAsync = require('../utils/catchAsync')

const getContacts = catchAsync(async (req, res) => {
    const {page_index, page_size, sort} = req.query
    const contacts = await contactService.getContacts(page_index, page_size, sort)
    res.status(200).send({success: true, contacts})
})

const getContactDetail = catchAsync(async (req, res) => {
    const {id} = req.params
    const contact = await contactService.getDetailContact(id)
    res.status(200).send({success: true, data: contact})
})

const createContact = catchAsync(async (req, res) => {
    const isError = await validateError(req, res)
    if (!isError) {
        const contact = await contactService.createContact(req.body)
        res.status(httpStatus.CREATED).send({success: true, contact})
    }
})

const deleteContact = catchAsync(async (req, res) => {
    const {id} = req.params
    const isError = await validateError(req, res)
    if (!isError) {
        await contactService.deleteContactById(id)
        res.status(httpStatus.NO_CONTENT).send({success: true})
    }
})

module.exports = {
    getContacts,
    getContactDetail,
    createContact,
    deleteContact
}
