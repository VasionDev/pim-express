// external import
const express = require('express')

// internal import
const { snippetCategoryValidator, snippetValidationHandler, snippetCategoryUpdateValidator, snippetTextValidator, snippetTextUpdateValidator } = require('../../middleware/collection/snippetTextFormValidator')
const { getSnippetCategories, createSnippetCategory, snippetCatById, updateSnippetCategory, deleteSnippetCategory, createTextSnippet, snippetTextById, updateSnippetText, deleteSnippetText } = require('../../modules/collections/snippet/controller')

const snippetRouter = express.Router()

snippetRouter.get('/', getSnippetCategories)
snippetRouter.post('/', snippetCategoryValidator, snippetValidationHandler, createSnippetCategory)
snippetRouter.get('/:id', snippetCatById)
snippetRouter.put('/:id', snippetCategoryUpdateValidator, snippetValidationHandler, updateSnippetCategory)
snippetRouter.delete('/:id', deleteSnippetCategory)

snippetRouter.post('/:id/text', snippetTextValidator, snippetValidationHandler, createTextSnippet)
snippetRouter.get('/text/:id', snippetTextById)
snippetRouter.put('/text/:id', snippetTextUpdateValidator, snippetValidationHandler, updateSnippetText)
snippetRouter.delete('/text/:id', deleteSnippetText)

module.exports = snippetRouter