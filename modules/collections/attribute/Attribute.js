const mongoose = require('mongoose')

const attributeSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    choices: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Choice',
        default: []
    }
},  {timestamps: true})

const Attribute = mongoose.model('Attribute', attributeSchema)
module.exports = Attribute