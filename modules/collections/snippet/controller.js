const { addSnippetCategory, addSnippet, getCategory, getCategoryList, getSnippetList, getSnippet, editSnippetCategory, editSnippetText, deleteSnippetCat, deleteSnippetById } = require("./service")

const createSnippetCategory = async (req, res, next) => {
    const response = await addSnippetCategory(req.body)
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

const createTextSnippet = async (req, res, next) => {
    const response = await addSnippet(req.params.id, req.body)
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

const getSnippetCategories = async (req, res, next) => {
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

const getSnippets = async (req, res, next) => {
    const response = await getSnippetList()
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

const snippetCatById = async (req, res, next) => {
    const response = await getCategory(req.params.id)
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

const snippetTextById = async (req, res, next) => {
    const response = await getSnippet(req.params.id)
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

const updateSnippetCategory = async (req, res, next) => {
    const response = await editSnippetCategory(req.params.id, req.body)
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

const updateSnippetText = async (req, res, next) => {
    const response = await editSnippetText(req.params.id, req.body)
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

const deleteSnippetCategory = async (req, res, next) => {
    const response = await deleteSnippetCat(req.params.id)
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

const deleteSnippetText = async (req, res, next) => {
    const response = await deleteSnippetById(req.params.id)
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
    createSnippetCategory,
    createTextSnippet,
    getSnippetCategories,
    getSnippets,
    snippetCatById,
    snippetTextById,
    updateSnippetCategory,
    updateSnippetText,
    deleteSnippetCategory,
    deleteSnippetText
}