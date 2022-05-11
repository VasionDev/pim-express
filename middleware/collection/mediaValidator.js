// external import
const { check, validationResult } = require("express-validator");
const createHttpError = require("http-errors");
const { MediaCategory, MediaInput } = require("../../modules/collections/media/Media");


// media category validator
const mediaCategoryValidator = [
    check('name')
        .isLength({min: 2})
        .withMessage('Media category name must not be empty and min 2 character.')
        .trim()
        .custom(async (value) => {
            try{
                const result = await MediaCategory.find({name: { $regex : new RegExp("^" + value + "$", 'i') }})
                if(result.length) {
                    throw createHttpError('Media category name already exist')
                }
            }catch (err) {
                throw createHttpError(err.message)
            }
        }),
]

// media category validator
const mediaCategoryUpdateValidator = [
    check('name')
        .isLength({min: 2})
        .withMessage('Media category name must not be empty and min 2 character.')
        .trim()
        .optional({nullable: true})
]

// media category validator
const mediaInputValidator = [
    check('name')
        .isLength({min: 2})
        .withMessage('Media name must not be empty and min 2 character.')
        .trim()
        .custom(async (value) => {
            try{
                const result = await MediaInput.find({name: { $regex : new RegExp("^" + value + "$", 'i') }})
                if(result.length) {
                    throw createHttpError('Media name already exist')
                }
            }catch (err) {
                throw createHttpError(err.message)
            }
        }),
]

// media category validator
const mediaInputUpdateValidator = [
    check('name')
        .isLength({min: 2})
        .withMessage('Media name must not be empty and min 2 character.')
        .trim()
        .optional({nullable: true})
]


// media validation handler
const mediaValidationHandler = (req, res, next) => {
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
    mediaCategoryValidator,
    mediaInputValidator,
    mediaCategoryUpdateValidator,
    mediaInputUpdateValidator,
    mediaValidationHandler
}