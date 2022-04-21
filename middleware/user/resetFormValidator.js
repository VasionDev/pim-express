// external import
const { check, validationResult } = require("express-validator");
const createHttpError = require("http-errors");

// user form validator
const resetFormValidator = [
    check('email')
        .isEmail()
        .withMessage('Must be a valid email')
        .trim()   
]

// user form validation handler
const resetValidationHandler = (req, res, next) => {
    const errors = validationResult(req)
    const mappedErrors = errors.array()
    if(Object.keys(mappedErrors).length === 0 ) {
        next()
    }else {
        res.status(500).json({
            errors: {common: mappedErrors[0] }
        })
    }
}


module.exports = {
    resetFormValidator,
    resetValidationHandler,
}