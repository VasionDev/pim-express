// internal import 
const { add, edit, getList, getOne, deleteOne } = require("./attributeService")

// Create new Attribute
const createAttribute = async (req, res, next) => {
    const response = await add(req.body)
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

// Get all Attribute
const getAttributes = async (req, res, next) => {
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

// Get Attribute by attribute ID
const attributeById = async (req, res, next) => {
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

// edit attribute
const updateAttribute = async (req, res, next) => {
    const response = await edit(req.params.id, req.body)
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

// delete attribute
const deleteAttribute = async (req, res, next) => {
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
    createAttribute,
    getAttributes,
    attributeById,
    updateAttribute,
    deleteAttribute,
}