// external import
const express = require('express')
// internal import
const { sellingChannelCreateValidator, sellingChannelValidationHandler, sellingChannelUpdateValidator } = require('../../middleware/collection/sellingChannelvalidator')
const { getAllSellingChannel, createSellingChannel, sellingChannelById, updateSellingChannel, removeSellingChannel } = require('../../modules/collections/sellingChannel/controller')

const sellingChannelRouter = express.Router()

sellingChannelRouter.get('/', getAllSellingChannel)
sellingChannelRouter.post('/', sellingChannelCreateValidator, sellingChannelValidationHandler, createSellingChannel)
sellingChannelRouter.get('/:id', sellingChannelById)
sellingChannelRouter.put('/:id', sellingChannelUpdateValidator, sellingChannelValidationHandler, updateSellingChannel)
sellingChannelRouter.delete('/:id', removeSellingChannel)

module.exports = sellingChannelRouter