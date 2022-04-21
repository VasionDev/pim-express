const { resetUserPassword, updateInvitedUser, add } = require('../../modules/user/userService');
const { sendResetLink, sendInvitationLink, validateGeneratedLink, deleteInviteTokenLink } = require('../services/invitationService');

// Request for password reset link with email
const reqResetPassword = async (req, res, next) => {
    const response = await sendResetLink(req.body.email)
    if(response.status === 200 ) {
        res.json(response)
    }else{
        res.status(response.status).json(response)
    }
}

// send invitation link to the email
const sendInvitation = async (req, res, next) => {

    const invitedUserRes = await add(req.body)
    if(invitedUserRes.status === 200) {
        const response = await sendInvitationLink(req.body.email)
        if(response.status === 200 ) {
            res.json(response)
        }else{
            res.status(response.status).json(response)
        }
    }else {
        res.status(500).json({msg: 'something went wrong', status: 500})
    }
}

// Cancel invitation
const cancelInvitation = async (req, res, next) => {
    const response = await deleteInviteTokenLink(req.body.email)
    res.status(response.status).json(response)
}

// verify password reset/invitation link with id & token
const verifyLink = async (req, res, next) => {
    const {id, token} = req.query
    const response = await validateGeneratedLink(id, token)
    if(response.status === 200 ) {
        res.json({data: {...response.user._doc}, msg: 'token is valid', status: 200})
    }else{
        res.status(response.status).json(response)
    }
}

// reset the user password
const resetPassword = async(req, res, next) => {
    const response = await validateGeneratedLink(req.params.id, req.params.token)
    if(response.status === 200 ) {
        const {user, token} = response
        const updateResponse = await resetUserPassword(user, token, req.body)
        if(updateResponse.status === 200 ) {
            res.json(updateResponse)
        }else {
            res.status(updateResponse.status).json(updateResponse)
        }
    }else{
        res.status(response.status).json(response)
    }
}

// add invited user
const saveInvitedUser = async(req, res, next) => {
    const {id, token} = req.params
    const response = await validateGeneratedLink(id, token)
    if(response.status === 200 ) {
        const {user, token} = response
        const updateResponse = await updateInvitedUser(user, token, req.body)
        if(updateResponse.status === 200 ) {
            res.json(updateResponse)
        }else {
            res.status(updateResponse.status).json(updateResponse)
        }
    }else{
        res.status(response.status).json(response)
    }
}

module.exports = {
    reqResetPassword,
    sendInvitation,
    verifyLink,
    resetPassword,
    saveInvitedUser,
    cancelInvitation
}