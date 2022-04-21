/**
 * User/Team model
 */
const mongoose = require('mongoose')

const teamSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    users: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'User',
        default: [] 
    },
    products: {
        type: [Object],
        default: [] 
    }
}, {timestamps: true})

const Team = mongoose.model('Team', teamSchema)
module.exports = Team
