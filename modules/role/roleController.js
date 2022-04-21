// internal import 
const { add, edit, getList, getOne, deleteOne } = require("./roleService")

// Create new Role
const createRole = async (req, res, next) => {
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

// Get all Role
const getRoles = async (req, res, next) => {
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

// Get Role by role ID
const roleById = async (req, res, next) => {
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

// edit role
const updateRole = async (req, res, next) => {
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

// delete category
const deleteRole = async (req, res, next) => {

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
    createRole,
    roleById,
    getRoles,
    updateRole,
    deleteRole
}