/**
 * Role model
*/
const mongoose = require('mongoose')

const roleSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    systemAdmin: {
        type: Boolean,
        default: false
    },
    dashboard: {
        type: Boolean,
        default: false
    },
    products: {
        type: Object,
        default: {
            view: false,
            create: false,
            manageCollaborators: false,
            publishUnpublish: false,
            archiveDelete: false,
            segments: {
                generalSettings: 'viewer',
                productAttributes: 'viewer',
                pricing: 'viewer',
                delivery: 'viewer',
                sellingChannels: 'viewer',
                seo: 'viewer',
                media: 'viewer',
                content: 'viewer',
                formula: 'viewer',
                faq: 'viewer',
                reviews: 'viewer',
                translations: 'viewer'
            }
        },
    },
    collections: {
        type: Object,
        default: {
            categories: 'viewer',
            attributes: 'viewer',
            mediaCategories: 'viewer',
            formula:'viewer',
            tags: 'viewer',
            metadata: 'viewer',
            textSnippets: 'viewer',
            sellingChannels: 'viewer',
            taxesFees: 'viewer',
            teams: 'viewer',
            reviews: 'viewer',
            faq: 'viewer'
        }
    },
    priceList: {
        type: Boolean,
        default: false
    },
}, {timestamps: true})

const Role = mongoose.model('Role', roleSchema)
module.exports = Role
