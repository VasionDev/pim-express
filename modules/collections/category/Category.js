/**
 * Category model
 */
const mongoose = require('mongoose')
/*async function validator (val) {
    const value = await Category.find({name: val});
    if(value.length) {
        return false
    }
}
const custom = [validator, `'{VALUE} is already exist'`]
*/
const categorySchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        // validate: custom
    },
    slug: {
        type: String,
        default: ''
    },
    shortText: {
        type: String,
        default: ''
    },
    longText: {
        type: String,
        default: ''
    },
    media: {
        type: [Object],
        default: []
    },
    subCategories: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Category',
        default: []
    },
    isChild: {
        type: Boolean,
        default: false
    }
}, {timestamps: true})

var autoPopulateLead = function(next) {
  this.populate({path:'subCategories', options: {sort: {name:1}}});
  next();
};

categorySchema.
  pre('findOne', autoPopulateLead).
  pre('find', autoPopulateLead);

const Category = mongoose.model('Category', categorySchema)
module.exports = Category