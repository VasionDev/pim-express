// external import
const { check, validationResult } = require("express-validator");
const createHttpError = require("http-errors");

// internal import
const Tag = require("../../modules/collections/tag/Tag");

// tag form validator
const tagFormValidator = [
    check('name')
        .isLength({min: 2})
        .withMessage('Tag name must not be empty and min 2 character.')
        .trim()
        .custom(async (value) => {
            try{
                const result = await Tag.find({name: { $regex : new RegExp("^" + value + "$", 'i') }})
                if(result.length) {
                    throw createHttpError('Tag name already exist')
                }
            }catch (err) {
                throw createHttpError(err.message)
            }
        })
]

// tag bulk form validator
const tagBulkFormValidator = [
    check('tagNames')
        .isArray({min:1})
        .withMessage('Must be an array')
]

// tag form validation handler
const tagValidationHandler = (req, res, next) => {
    const errors = validationResult(req)
    // const mappedErrors = errors.mapped()
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
    tagFormValidator,
    tagBulkFormValidator,
    tagValidationHandler
}