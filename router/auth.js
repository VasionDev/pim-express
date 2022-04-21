// external import
const express = require('express')

// internal import
const { reqResetPassword, verifyLink, resetPassword, sendInvitation, saveInvitedUser, cancelInvitation } = require('../common/controllers/invitationController')
const { verifyResetpass, verifyInvitation } = require('../middleware/common/verifyWithEmail')
const { invitationFormValidator, invitationValidationHandler } = require('../middleware/user/invitationFormValidator')
const { passwordFormValidator, passwordValidationHandler } = require('../middleware/user/passwordFormValidator')
const { resetFormValidator, resetValidationHandler } = require('../middleware/user/resetFormValidator')
const { getMvTokenFromFile } = require('../utilities/mvAuthToken')

const authRouter = express.Router()

authRouter.post('/password-reset', resetFormValidator, resetValidationHandler, verifyResetpass, reqResetPassword)
authRouter.post('/password-reset/:id/:token', passwordFormValidator, passwordValidationHandler, resetPassword)
authRouter.post('/invitation', resetFormValidator, resetValidationHandler, verifyInvitation, sendInvitation)
authRouter.post('/invitation/cancel', resetFormValidator, resetValidationHandler, cancelInvitation)
authRouter.post('/invitation/:id/:token', invitationFormValidator, invitationValidationHandler, saveInvitedUser)
authRouter.get('/verify-link', verifyLink)

authRouter.get('/mv-access-token', getMvTokenFromFile)

module.exports = authRouter