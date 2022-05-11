const { addFaqCategory, addFaq, getCategoryList, getFaqList, getFaqCategory, getFaq, editFaqCategory, editFaq, deleteFaqCat, deleteFaqById } = require("./service")

const createFaqCategory = async (req, res, next) => {
    const response = await addFaqCategory(req.body)
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

const createFaq = async (req, res, next) => {
    const response = await addFaq(req.params.id, req.body)
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

const getFaqCategories = async (req, res, next) => {
    const response = await getCategoryList()
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

const getFaqs = async (req, res, next) => {
    const response = await getFaqList()
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

const faqCatById = async (req, res, next) => {
    const response = await getFaqCategory(req.params.id)
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

const faqById = async (req, res, next) => {
    const response = await getFaq(req.params.id)
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

const updateFaqCategory = async (req, res, next) => {
    const response = await editFaqCategory(req.params.id, req.body)
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

const updateFaq = async (req, res, next) => {
    const response = await editFaq(req.params.id, req.body)
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

const deleteFaqCategory = async (req, res, next) => {
    const response = await deleteFaqCat(req.params.id)
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

const deleteFaq = async (req, res, next) => {
    const response = await deleteFaqById(req.params.id)
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
    createFaqCategory,
    createFaq,
    getFaqCategories,
    getFaqs,
    faqCatById,
    faqById,
    updateFaqCategory,
    updateFaq,
    deleteFaqCategory,
    deleteFaq
}