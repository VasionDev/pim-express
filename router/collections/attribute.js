// external import
const express = require('express')

// internal import
const { attributeFormValidator, attributeValidationHandler, attributeUpdateFormValidator, choiceFormValidator } = require('../../middleware/collection/attributeFormValidator')
const { getAttributes, createAttribute, attributeById, updateAttribute, deleteAttribute } = require('../../modules/collections/attribute/attributeController')
const { addChoice, editChoice, deleteChoice } = require('../../modules/collections/choice/controller')

const attributeRouter = express.Router()

attributeRouter.get('/', getAttributes)
attributeRouter.post('/add', attributeFormValidator, attributeValidationHandler, createAttribute)
attributeRouter.get('/get/:id', attributeById)
attributeRouter.put('/edit/:id', attributeUpdateFormValidator, attributeValidationHandler, updateAttribute)
attributeRouter.delete('/delete/:id', deleteAttribute)

attributeRouter.post('/:id/choice/add', choiceFormValidator, attributeValidationHandler, addChoice)
attributeRouter.put('/choice/edit/:id', editChoice)
attributeRouter.delete('/choice/:id', deleteChoice)

module.exports = attributeRouter