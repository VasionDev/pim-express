// external import
const express = require('express')
// internal import
const { reviewValidator, reviewValidationHandler, reviewUpdateValidator } = require('../../middleware/collection/reviewFormValidator')
const { createReview, getAllReview, reviewById, updateReview, removeReview } = require('../../modules/collections/review/controller')

const reviewRouter = express.Router()

reviewRouter.get('/', getAllReview)
reviewRouter.post('/', reviewValidator, reviewValidationHandler, createReview)
reviewRouter.get('/:id', reviewById)
reviewRouter.put('/:id', reviewUpdateValidator, reviewValidationHandler, updateReview)
reviewRouter.delete('/:id', removeReview)

module.exports = reviewRouter