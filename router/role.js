// external import
const express = require('express')

// internal controller import
const { createRole, roleById, getRoles, updateRole, deleteRole } = require('../modules/role/roleController')

// internal middleware import
const { roleFormValidator, roleValidationHandler } = require('../middleware/role/roleFormValidator')

const roleRouter = express.Router()

roleRouter.get('/', getRoles)
roleRouter.post('/add', roleFormValidator, roleValidationHandler, createRole)
roleRouter.get('/get/:id', roleById)
roleRouter.put('/edit/:id', updateRole)
roleRouter.delete('/delete/:id', deleteRole)

module.exports = roleRouter