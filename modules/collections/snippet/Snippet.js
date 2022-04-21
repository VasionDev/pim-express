const mongoose = require('mongoose')

const snippetCategory = mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    }
}, {timestamps: true})

const textSnippet = mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    snippetId: {
        type: String,
        trim: true,
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Snippet_Category',
        required: true
    },
    text: {
        type: String,
        trim: true,
        required: true
    }
}, {timestamps: true})

const SnippetCategory = mongoose.model('Snippet_Category', snippetCategory)
const TextSnippet = mongoose.model('Text_Snippet', textSnippet)

module.exports = {
    SnippetCategory,
    TextSnippet
}