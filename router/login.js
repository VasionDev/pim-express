// external import
const express = require('express')

// internal controller import
const { login } = require('../common/controllers/loginController')

// internal middleware import
const { loginFormValidator, loginFormValidationHandler } = require('../middleware/login/loginFormValidator')

const loginRouter = express.Router()

loginRouter.post('/', loginFormValidator, loginFormValidationHandler, login)
// loginRouter.delete('/', signout)

module.exports = loginRouter