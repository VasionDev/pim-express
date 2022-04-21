/**
 * User Model
*/
const mongoose = require('mongoose')
const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        default: '',
        trim: true
    },
    lastName: {
        type: String,
        default: '',
        trim: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        trim: true,
    },
    role: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Role',
    },
    superAdmin: {
        type: Boolean,
        default: false
    },
    systemAdmin: {
        type: Object,
        default: {}
    },
    dashboard: {
        type: Object,
        default: {}
    },
    products: {
        type: Object,
        default: {}
    },
    collections: {
        type: Object,
        default: {}
    },
    priceList: {
        type: Object,
        default: {}
    },
    teams: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Team',
        default: []
    },
    avatar: {
        type: String,
        default: ''
    },
    status: {
        type: String,
        default: 'invited'
    }
}, {timestamps: true})

userSchema.methods.loggedUserInfo = function() {
    return mongoose.model('User').findOne({ email: this.email }).populate('role').select(['-password']);
}

const User = mongoose.model('User', userSchema)
module.exports = User
