// external import
const express = require('express')

// internal import
const { getMediaCategories, getMedias, createMedia, createMediaCategory, mediaCatById, mediaById, updateMediaCategory, updateMedia, deleteMediaCategory, deleteMedia } = require('../../modules/collections/media/controller')
const { mediaCategoryValidator, mediaValidationHandler, mediaInputValidator, mediaCategoryUpdateValidator, mediaInputUpdateValidator } = require('../../middleware/collection/mediaValidator')

const mediaRouter = express.Router()

mediaRouter.get('/', getMediaCategories)
mediaRouter.post('/', mediaCategoryValidator, mediaValidationHandler, createMediaCategory)
mediaRouter.get('/:id', mediaCatById)
mediaRouter.put('/:id', mediaCategoryUpdateValidator, mediaValidationHandler, updateMediaCategory)
mediaRouter.delete('/:id', deleteMediaCategory)

mediaRouter.post('/:id/media', mediaInputValidator, mediaValidationHandler, createMedia)
mediaRouter.get('/media/:id', mediaById)
mediaRouter.put('/media/:id', mediaInputUpdateValidator, mediaValidationHandler, updateMedia)
mediaRouter.delete('/media/:id', deleteMedia)

module.exports = mediaRouter