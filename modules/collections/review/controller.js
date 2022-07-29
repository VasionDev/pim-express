const { addReview, getReviewList, getReview, editReview, deleteReview } = require("./service")

const createReview = async (req, res, next) => {
    const isExpand = req.query.expandProducts && req.query.expandProducts === 'true' ? true : false
    const response = await addReview(req.body, isExpand)
    if(response.status === 200 ) {
        res.json(response)
    }else {
        res.status(response.status).json({
            errors: {
                common: response
            }
        })
    }
}

const getAllReview = async (req, res, next) => {
    const isExpand = req.query.expandProducts && req.query.expandProducts === 'true' ? true : false
    const response = await getReviewList(isExpand)
    if(response.status === 200 ) {
        res.json(response)
    }else {
        res.status(response.status).json({
            errors: {
                common: response
            }
        })
    } 
}

const reviewById = async (req, res, next) => {
    const isExpand = req.query.expandProducts && req.query.expandProducts === 'true' ? true : false
    const response = await getReview(req.params.id, isExpand)
    if(response.status === 200 ) {
        res.json(response)
    }else {
        res.status(response.status).json({
            errors: {
                common: response
            }
        })
    }
}

const updateReview = async (req, res, next) => {
    const isExpand = req.query.expandProducts && req.query.expandProducts === 'true' ? true : false
    const response = await editReview(req.params.id, req.body, isExpand)
    if(response.status === 200 ) {
        res.json(response)
    }else {
        res.status(response.status).json({
            errors: {
                common: response
            }
        })
    }
}


const removeReview = async (req, res, next) => {
    const response = await deleteReview(req.params.id)
    if(response.status === 200 ) {
        res.json(response)
    }else {
        res.status(response.status).json({
            errors: {
                common: response
            }
        })
    }
}

module.exports = {
    createReview,
    getAllReview,
    reviewById,
    updateReview,
    removeReview
}