// internal import
const { userLogin } = require('../services/authService')

// login user
const login = async (req, res, next) => {

    const response = await userLogin(req.body.email, req.body.password)
    if(response.status === 200 ) {
        res.header('Authorization', `Bearer ${response.authToken}`).json(response)
    }else {
        res.status(response.status).json({
            errors: {
                common: response
            }
        })
    }
}

module.exports = {
    login
}