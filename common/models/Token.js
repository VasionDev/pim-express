/**
 * Token Model
 */
const mongoose = require('mongoose')

const tokenSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    token: {
        type: String,
        required: true
    },
    creationAt: {
        type: Date,
        default: Date.now,
        expires : 86400
    }
})

const Token = mongoose.model('Token', tokenSchema)

module.exports = Token
