const mongoose = require('mongoose')

const mediaCategorySchema = mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    description: {
        type: String,
        default: ''
    },
    media: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Media_Input',
        default: []
    }
}, {timestamps: true})

const mediaInputSchema = mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    description: {
        type: String,
        default: ''
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Media_Category',
        default: null
    },
    extensions: {
        image: {
            type: [String],
            default: []
        },
        video: {
            type: [String],
            default: []
        },
        document: {
            type: [String],
            default: []
        }
    },
    sizeLimit: {
        image: {
            type: Object,
            default: null
        },
        video: {
            type: Object,
            default: null
        },
        document: {
            type: Object,
            default: null
        }
    },
    quantity: {
        min: {
            type: Number,
            default: 1
        },
        max: {
            type: Number,
            default: 10
        }
    }
}, {timestamps: true})

const MediaCategory = mongoose.model('Media_Category', mediaCategorySchema)
const MediaInput = mongoose.model('Media_Input', mediaInputSchema)

module.exports = {
    MediaCategory,
    MediaInput
}