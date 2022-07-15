const { check, validationResult } = require("express-validator");
const createHttpError = require("http-errors");

// review validator
const reviewValidator = [
    check('name')
        .isLength({min: 2})
        .withMessage('name must not be empty and min 2 character.')
        .trim(),
    check('rating')
        .isNumeric({min: 1, max: 5})
        .withMessage('rating should not be empty and between 1-5 star')
]

// edit review validator
const reviewUpdateValidator = [
    check('name')
        .isLength({min: 2})
        .withMessage('name must not be empty and min 2 character.')
        .trim()
        .optional({nullable: true}),
    check('rating')
        .isNumeric({min: 1, max: 5})
        .withMessage('rating should not be empty and between 1-5 star')
        .optional({nullable: true})
]

// review validation handler
const reviewValidationHandler = (req, res, next) => {
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
    reviewValidator,
    reviewUpdateValidator,
    reviewValidationHandler
}