const crypto = require('crypto');
const Token = require("../models/Token");
const User = require("../../modules/user/User");
const sendEmail = require('../../utilities/sendEmail');

/**
 * generate token
 * @param {*} email 
 * @returns user & token obj
 */
const generateTokenForUser = async (email) => {
    try {
        const user = await User.findOne({ email: email }).select('-password');
        if (!user)
            return null
        let token = await Token.findOne({ userId: user._id });
        if (!token) {
            token = await new Token({
                userId: user._id,
                token: crypto.randomBytes(32).toString("hex"),
            }).save();
        }
        await token.populate('userId')
        return {token, user}
    }catch(err) {
        return null
    }
}

/**
 * send password reset link
 * @param {*} email 
 * @returns success or error message 
 */
const sendResetLink = async (email) => {

    try{
        const {token, user} = await generateTokenForUser(email)
        if(token) {
            const link = `${process.env.BASE_URL}/password-reset/?id=${user.id}&token=${token.token}`
            const isSent = await sendEmail(user.email, "Password reset", user.firstName, link);
            if(isSent) {
                return { msg: 'Password reset link sent to your email account', status: 200 }
            }else {
                return { msg: 'An error occured', status: 500 }
            }
        }else {
            return {msg: "user with given email doesn't exist", status: 400}
        }
    }catch(err) {
        return {msg: "An error occured", status: 500}
    }
}

/**
 * send invitation link
 * @param {*} email 
 * @returns success or error message
 */
const sendInvitationLink = async (email) => {
    try{
        const {token, user} = await generateTokenForUser(email)
        if(token) {
            const link = `${process.env.BASE_URL}/invitation/?id=${user.id}&token=${token.token}`
            const isSent = await sendEmail(user.email, "PIM invitation", user.firstName, link, true);
            if(isSent) {
                return { msg: 'Invitation link sent to the email account', data: user, status: 200 }
            }else {
                return { msg: 'An error occured', status: 500 }
            }
        }else {
            return {msg: 'An error occured', status: 500}
        }
    }catch(err) {
        return {msg: "An error occured", status: 500}
    }
}

/**
 * 
 * @param {*} userID 
 * @param {*} userToken 
 * @returns user & token if success or error message
 */
const validateGeneratedLink = async (userID, userToken) => {
    try {
        const user = await User.findById(userID).select(['-password']);
        if (!user) return {msg: 'invalid link or expired', status: 400};

        const token = await Token.findOne({
            userId: user._id,
            token: userToken,
        });
        if (!token) return {msg: 'invalid link or expired', status: 400};
        return {user, token, status: 200};
    } catch (error) {
        return {msg: "An error occured", status: 500}
    }
}

const deleteInviteTokenLink = async (email) => {
    try {
        const user = await User.findOne({ email: email, status: 'invited' });
        if (!user)
            return {msg: "No invited user found with the given email", status: 404}
        const token = await Token.findOne({ userId: user._id });
        if (token) {
           await token.delete();
           user.status = 'invitation_cancelled';
           await user.save();
        }
        return {msg: "Invitation cancelled", status: 200}
    }catch(err) {
        return {msg: "Something went wrong", status: 500}
    }
}

module.exports = {
    sendResetLink,
    sendInvitationLink,
    validateGeneratedLink,
    deleteInviteTokenLink
}