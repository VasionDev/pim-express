// internal import 
const { add, edit, getList, getOne, deleteOne, createSuperUser, updateUserProfile, userRoleBulkUpdateOnRoleDel } = require("./userService")

// Create new User
const createUser = async (req, res, next) => {
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

// Get all User
const getUsers = async (req, res, next) => {
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

// Get User by user ID
const userById = async (req, res, next) => {
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

// edit user
const updateUser = async (req, res, next) => {
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

// delete user
const deleteUser = async (req, res, next) => {

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

// add super user
const addSuperUser = async (req, res, next) => {

    const response = await createSuperUser()

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

// manage/update user profile/personal info
const manageUserProfile = async (req, res, next) => {
    
    const response = await updateUserProfile(req.user.userId, req.body)
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

const userRoleBulkUpdate = async (req, res, next) => {
    const {data} = req.body
    const response = await userRoleBulkUpdateOnRoleDel(data)
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
    createUser,
    getUsers,
    userById,
    updateUser,
    deleteUser,
    addSuperUser,
    manageUserProfile,
    userRoleBulkUpdate
}