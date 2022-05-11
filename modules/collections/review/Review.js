const mongoose = require('mongoose')

const reviewSchema = mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    occupation: {
        type: String,
        trim: true,
        default: ''
    },
    location: {
        type: String,
        trim: true,
        default: ''
    },
    rating: {
        type: Number,
        required: true
    },
    shortReview: {
        type: String,
        trim: true,
        default: ''
    },
    longReview: {
        type: String,
        trim: true,
        default: ''
    },
    images: {
        type: [Object],
        default: []
    },
    products: {
        type: [Object],
        default: []
    }
}, {timestamps: true})

const Review = mongoose.model('Review', reviewSchema)

module.exports = {
    Review
}