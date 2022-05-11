const mongoose = require('mongoose')

const faqCategory = mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    faqs: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Faq',
        default: []
    }
}, {timestamps: true})

const faq = mongoose.Schema({
    question: {
        type: String,
        trim: true,
        required: true
    },
    note: {
        type: String,
        trim: true
    },
    answers: {
        type: [{
            answer: {
                type: String,
                trim: true
            },
            products: {
                type: [Object]
            }
        }],
        default: []
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Faq_Category',
        required: true 
    }
}, {timestamps: true})

const FaqCategory = mongoose.model('Faq_Category', faqCategory)
const Faq = mongoose.model('Faq', faq)

module.exports = {
    FaqCategory,
    Faq
}