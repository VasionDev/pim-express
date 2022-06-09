const mongoose = require('mongoose')

const sellingChannelSchema = mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    destination: {
        platform: {
            type: String,
            trim: true,
            required: true
        },
        value: {
            type: String,
            trim: true,
            required: true
        }
    },
    country: {
        type: String,
        trim: true,
        required: true
    },
    priceList: {
        type: String,
        default: ''
    },
    screens: {
        type: [String],
        default: []
    }
}, {timestamps: true})

const SellingChannel = mongoose.model('Selling_Channel', sellingChannelSchema)

module.exports = SellingChannel