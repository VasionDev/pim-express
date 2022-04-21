// external import
const express = require('express')

// internal import
const { getTeams, createTeam, teamById, updateTeam, deleteTeam } = require('../modules/team/teamController')
const { teamFormValidator, teamValidationHandler } = require('../middleware/team/teamFormValidator')

const teamRouter = express.Router()

teamRouter.get('/', getTeams)
teamRouter.post('/add', teamFormValidator, teamValidationHandler, createTeam)
teamRouter.get('/get/:id', teamById)
teamRouter.put('/edit/:id', updateTeam)
teamRouter.delete('/delete/:id', deleteTeam)

module.exports = teamRouter