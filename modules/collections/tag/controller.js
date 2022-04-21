const { add, getList, getOne, edit, deleteOne, bulkAdd } = require("./service")

// Create new Tag
const createTag = async (req, res, next) => {
    const response = await add(req.body.name)
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

const createBulkTag = async (req, res, next) => {
    const response = await bulkAdd(req.body.tagNames)
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

// Get all Tag
const gettags = async (req, res, next) => {
    const response = await getList()
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

// Get Tag by tag ID
const tagById = async (req, res, next) => {
    const response = await getOne(req.params.id)
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

// edit tag
const updateTag = async (req, res, next) => {
    const response = await edit(req.params.id, req.body.name)
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

// delete tag
const deleteTag = async (req, res, next) => {

    const response = await deleteOne(req.params.id)
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
    createTag,
    createBulkTag,
    gettags,
    tagById,
    updateTag,
    deleteTag
}