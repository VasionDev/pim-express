// external import
const { check, validationResult } = require("express-validator");
const createHttpError = require("http-errors");

// user pass form validator
const invitationFormValidator = [
    check('firstName')
        .isLength({min: 1})
        .withMessage('First name must not be empty and min 2 character.')
        .trim(),
    check('lastName')
        .isLength({min: 1})
        .withMessage('Last name must not be empty and min 2 character.')
        .trim(),
    check('newPassword')
        .isLength({min: 6})
        .withMessage('Password must not be empty and min 6 character.')
        .trim(),
    check('confirmPassword')
        .isLength({min: 6})
        .withMessage('Confirm password must not be empty.')
        .trim(), 
]

// user pass form validation handler
const invitationValidationHandler = (req, res, next) => {
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
    invitationFormValidator,
    invitationValidationHandler,
}