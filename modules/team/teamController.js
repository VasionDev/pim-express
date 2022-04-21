// internal import 
const { add, edit, getList, getOne, deleteOne } = require("./teamService")

// Create new Team
const createTeam = async (req, res, next) => {
    const response = await add(req.body, req.query)
    
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

// Get all Team
const getTeams = async (req, res, next) => {
    const response = await getList(req.query)
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

// Get Team by team ID
const teamById = async (req, res, next) => {
    const response = await getOne(req.params.id, req.query)
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

// edit team
const updateTeam = async (req, res, next) => {
    const response = await edit(req.params.id, req.body, req.query)
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

// delete team
const deleteTeam = async (req, res, next) => {

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
    createTeam,
    getTeams,
    teamById,
    updateTeam,
    deleteTeam
}