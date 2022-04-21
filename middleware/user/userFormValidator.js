// external import
const { check, validationResult } = require("express-validator");
const createHttpError = require("http-errors");

// internal import
const User = require("../../modules/user/User");

// user form validator
const userFormValidator = [
    check('email')
        .isEmail()
        .withMessage('Must be a valid email')
        .trim()
        .custom(async (value) => {
            try{
                const result = await User.find({email: value})
                if(result.length) {
                    throw createHttpError('Email already exist')
                }
            }catch (err) {
                throw createHttpError(err.message)
            }
        })     
]

// user form validation handler
const userValidationHandler = (req, res, next) => {
    const errors = validationResult(req)
    const mappedErrors = errors.mapped()
    if(Object.keys(mappedErrors).length === 0 ) {
        next()
    }else {
        res.status(500).json({
            errors: mappedErrors
        })
    }
}


module.exports = {
    userFormValidator,
    userValidationHandler,
}