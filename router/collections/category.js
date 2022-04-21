// external import
const express = require('express')

// internal import
const { getCategories, createCategory, categoryById, updateCategory, deleteCategory, createBulkCategory, createSubCategory } = require('../../modules/collections/category/categoryController')
const { categoryValidationHandler, categoryFormValidator, categoryBulkFormValidator, categoryBulkValidationHandler, subCategoryValidation } = require('../../middleware/collection/categoryFormValidator')

const categoryRouter = express.Router()

categoryRouter.get('/', getCategories)
categoryRouter.post('/add', categoryFormValidator, categoryValidationHandler, createCategory)
categoryRouter.post('/add/subcategory', subCategoryValidation, createSubCategory)
categoryRouter.post('/add/bulk', categoryBulkFormValidator, categoryBulkValidationHandler, createBulkCategory)
categoryRouter.get('/get/:id', categoryById)
categoryRouter.put('/edit/:id', updateCategory)
categoryRouter.delete('/delete/:id', deleteCategory)

module.exports = categoryRouter