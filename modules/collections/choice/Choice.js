const mongoose = require('mongoose')

const choiceSchema = mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
    },
    suffix: {
        type: String,
        trim: true,
        default: ''
    },
    attribute: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Attribute',
    }
},  {timestamps: true})

const Choice = mongoose.model('Choice', choiceSchema)
module.exports = Choice