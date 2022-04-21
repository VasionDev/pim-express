// external import
const { check, validationResult } = require("express-validator");
const createHttpError = require("http-errors");

// internal import
const Attribute = require("../../modules/collections/attribute/Attribute");

// attribute form validator
const attributeFormValidator = [
    check('name')
        .isLength({min: 2})
        .withMessage('Attribute name must not be empty and min 2 character.')
        .trim()
        .custom(async (value) => {
            try{
                const result = await Attribute.find({name: { $regex : new RegExp("^" + value + "$", 'i') }})
                if(result.length) {
                    throw createHttpError('Attribute name already exist')
                }
            }catch (err) {
                throw createHttpError(err.message)
            }
        }),
    check('choices')
        .isArray()
        .withMessage('Choices must be an array')
        .optional({nullable: true})
]

// attribute update form validator
const attributeUpdateFormValidator = [
    check('name')
        .isLength({min: 2})
        .withMessage('Attribute name must not be empty and min 2 character.')
        .trim()
        .optional({nullable: true}),
    check('choices')
        .isArray()
        .withMessage('Choices must be an array')
        .optional({nullable: true})
]

// attribute update form validator
const choiceFormValidator = [
    check('name')
        .isLength({min: 2})
        .withMessage('Choice name must not be empty and min 2 character.')
        .trim()
]

// attribute form validation handler
const attributeValidationHandler = (req, res, next) => {
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
    attributeFormValidator,
    attributeUpdateFormValidator,
    choiceFormValidator,
    attributeValidationHandler,
}