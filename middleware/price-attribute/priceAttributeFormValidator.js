// external import
const { check, validationResult } = require("express-validator");
const createHttpError = require("http-errors");

// internal import
const PriceAttribute = require("../../models/PriceAttribute");

// price attribute form validator
const priceAttributeFormValidator = [
    check('name')
        .isLength({min: 2})
        .withMessage('Segment name must not be empty and min 2 character.')
        .trim()
        .custom(async (value) => {
            try{
                const result = await PriceAttribute.find({name: { $regex : new RegExp("^" + value + "$", 'i') }})
                if(result.length) {
                    throw createHttpError('Segment name already exist')
                }
            }catch (err) {
                throw createHttpError(err.message)
            }
        }),
]

// price attribute form validation handler
const priceAttributeValidationHandler = (req, res, next) => {
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
    priceAttributeFormValidator,
    priceAttributeValidationHandler,
}