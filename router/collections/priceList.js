// external import
const express = require('express')
const { priceListAddValidator, priceListValidationHandler, priceListEditValidator } = require('../../middleware/collection/priceListValidator')
// internal import
const { allPriceList, createPriceList, priceListById, updatePriceList, removePriceList } = require('../../modules/collections/priceList/controller')

const priceListRouter = express.Router()

priceListRouter.get('/', allPriceList)
priceListRouter.post('/', priceListAddValidator, priceListValidationHandler, createPriceList)
priceListRouter.get('/:id', priceListById)
priceListRouter.put('/:id', priceListEditValidator, priceListValidationHandler, updatePriceList)
priceListRouter.delete('/:id', removePriceList)

module.exports = priceListRouter