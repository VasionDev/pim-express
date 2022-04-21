// external import
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// internal import
const User = require("../../modules/user/User")

const userLogin = async (email, password) => {
    try {
        /*const user = await User.findOne({
            $or: [{email: username}, {username: username}]
        })*/

        const user = await User.findOne({email: email})
        if(user && user.password) {
            isValid = await bcrypt.compare(password, user.password)
            if(isValid){
                const userObject = {
                    userId: user.id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    role: user.role,
                    superAdmin: user.superAdmin
                }
                const token = await jwt.sign(userObject, process.env.JWT_SECRET, {
                    expiresIn: process.env.JWT_EXPIRE
                })
                const selectedUser = await user.loggedUserInfo()
                return {user: selectedUser, authToken: token, status: 200}
            }else{
                return {msg: 'Email or password is incorrect', status: 401}
            }
        }else {
            return {msg: 'Email or password is incorrect', status: 401}
        }
    }catch(err) {
        return {msg: err.message, status: 500}
    }
}

module.exports = {
    userLogin
}