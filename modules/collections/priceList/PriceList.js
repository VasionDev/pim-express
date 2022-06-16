const mongoose = require('mongoose')

const priceListSchema = mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    currency: {
        type: String,
        trim: true,
        lowercase: true,
        required: true
    },
    taxes: [{
        name: {
            type: String,
            trim: true,
            lowercase: true,
        },
        amount: {
            type: Number
        },
        evaluateIn: {
            type: String,
            trim: true,
            lowercase: true,
        }
    }]
}, {timestamps: true})


const PriceList = mongoose.model('Price_List', priceListSchema)

module.exports = PriceList