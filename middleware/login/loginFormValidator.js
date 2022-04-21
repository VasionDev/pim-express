// external import
const { check, validationResult } = require("express-validator");

// login form validator
const loginFormValidator = [
    check('email')
        .isLength({min: 1})
        .withMessage('Email must not be empty')
        .isEmail()
        .withMessage('Use valid Email address'),
    check('password')
        .isLength({min: 1})
        .withMessage('Password must not be empty')
]

// login form validation handler
const loginFormValidationHandler = (req, res, next) => {
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
    loginFormValidator,
    loginFormValidationHandler
}