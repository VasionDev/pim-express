// external import
const express = require('express')
const { tagFormValidator, tagValidationHandler, tagBulkFormValidator } = require('../../middleware/collection/tagFormValidator')
const { gettags, createTag, tagById, updateTag, deleteTag, createBulkTag } = require('../../modules/collections/tag/controller')

// internal import

const tagRouter = express.Router()

tagRouter.get('/', gettags)
tagRouter.post('/add', tagFormValidator, tagValidationHandler, createTag)
tagRouter.post('/add/bulk', tagBulkFormValidator, tagValidationHandler, createBulkTag)
tagRouter.get('/get/:id', tagById)
tagRouter.put('/edit/:id', updateTag)
tagRouter.delete('/delete/:id', deleteTag)

module.exports = tagRouter