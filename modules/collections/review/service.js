// internal import

const { Review } = require("./Review")

/**
 * add new review
 * @param data 
 * @returns Successful message or Error
 */
const addReview = async (data, expandProducts=false) => {
    try {
        const newReview = await new Review({
            ...data
        }).save()
        if(expandProducts) await newReview.populate('products')
        return {data: {...newReview._doc}, success: 'Review added successfully', status: 200}
    }catch(err) {
        return {msg: err.message, status: 500}
    }
}

/**
 * Edit/Update review
 * @param id 
 * @param data 
 * @returns Updated review or error message
 */

const editReview = async (id, data, expandProducts=false) => {
    try {
        const review = await Review.findByIdAndUpdate(id, {
            ...data
        }, {new: true})
        if(expandProducts) await review.populate('products')
        return {data: {...review._doc}, success: 'Review updated successfully', status: 200}
    }catch (err) {
        return {msg: err.message, status: 500}
    }
}

/**
 * Get all review
 * @returns All review list
 */
const getReviewList = async (expandProducts=false) => {
    try {
        const reviews = expandProducts ? await Review.find().sort({name:1}).populate('products') : await Review.find().sort({name:1})
        return {data: [...reviews], status: 200}
    }catch (err) {
        return {msg: err.message, status: 500}
    }
}

/**
 * Get review by ID
 * @param id 
 * @returns review data / Error message
 */
const getReview = async (id, expandProducts=false) => {
    try {
        const review = await Review.findById(id)
        if(review !== null ){
            if(expandProducts) await review.populate('products')
            return {data: {...review._doc}, status: 200}
        }
        throw Error('Review not found!')
    }catch (err) {
        return {msg: err.message, status: 500}
    }
}

/**
 * 
 * @param id 
 * @returns Deleted review or error message
*/
const deleteReview = async (id) => {
    try {
        const deletedReview = await Review.findByIdAndDelete(id)
        if(deletedReview !== null ){
            return {data: {...deletedReview._doc}, success: `Review deleted successfully`, status: 200}
        }
        throw Error('Review not found!')
    }catch (err){
        return {msg: err.message, status: 500}
    }
}

module.exports = {
    addReview,
    editReview,
    getReviewList,
    getReview,
    deleteReview
}