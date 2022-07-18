const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    slug: {
        type: String,
        trim: true,
        required: true
    },
    sku: {
        type: String,
        trim: true,
        default: ''
    },
    category: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Category',
        default: []
    },
    tag: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Tag',
        default: []
    },
    image: {
        type: Object,
        default: null
    }
}, {timestamps: true})

const Product = mongoose.model('Product', productSchema)

module.exports = {
    Product
}