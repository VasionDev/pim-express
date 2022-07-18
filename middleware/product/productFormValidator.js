const { check, validationResult } = require("express-validator");

// product validator
const productCreateValidator = [
    check('name')
        .isLength({min: 2})
        .withMessage('name must not be empty and min 2 character.')
        .trim(),
]

// edit product validator
const productUpdateValidator = [
    check('name')
        .isLength({min: 2})
        .withMessage('name must not be empty and min 2 character.')
        .trim()
        .optional({nullable: true}),
]

// product validation handler
const productValidationHandler = (req, res, next) => {
    const errors = validationResult(req)
    const mappedErrors = errors.array()
    if(Object.keys(mappedErrors).length === 0 ) {
        next()
    }else {
        res.status(500).json({
            errors: {common: mappedErrors[0]['msg']}
        })
    }
}

module.exports = {
    productCreateValidator,
    productUpdateValidator,
    productValidationHandler
}