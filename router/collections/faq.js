// external import
const express = require('express')

// internal import
const { faqCategoryValidator, faqValidationHandler, faqCategoryUpdateValidator, faqValidator, faqUpdateValidator } = require('../../middleware/collection/faqFormValidator')
const { createFaqCategory, getFaqCategories, faqCatById, updateFaqCategory, deleteFaqCategory, createFaq, faqById, updateFaq, deleteFaq } = require('../../modules/collections/faq/controller')

const faqRouter = express.Router()

faqRouter.get('/', getFaqCategories)
faqRouter.post('/', faqCategoryValidator, faqValidationHandler, createFaqCategory)
faqRouter.get('/:id', faqCatById)
faqRouter.put('/:id', faqCategoryUpdateValidator, faqValidationHandler, updateFaqCategory)
faqRouter.delete('/:id', deleteFaqCategory)

faqRouter.post('/:id/question', faqValidator, faqValidationHandler, createFaq)
faqRouter.get('/question/:id', faqById)
faqRouter.put('/question/:id', faqUpdateValidator, faqValidationHandler, updateFaq)
faqRouter.delete('/question/:id', deleteFaq)

module.exports = faqRouter