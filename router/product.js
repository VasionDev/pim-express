// external import
const express = require('express')

// internal import
const { productCreateValidator, productValidationHandler } = require('../middleware/product/productFormValidator')
const { getAllProduct, createProduct, productById, updateProduct, removeProduct } = require('../modules/product/controller')

const productRouter = express.Router()

productRouter.get('/', getAllProduct)
productRouter.post('/add', productCreateValidator, productValidationHandler, createProduct)
productRouter.get('/get/:id', productById)
productRouter.put('/edit/:id', updateProduct)
productRouter.delete('/delete/:id', removeProduct)

module.exports = productRouter