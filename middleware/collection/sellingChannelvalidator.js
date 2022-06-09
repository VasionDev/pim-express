// external import
const { check, validationResult } = require("express-validator");
const createHttpError = require("http-errors");
const SellingChannel = require("../../modules/collections/sellingChannel/SellingChannel");

// selling channel create validator
const sellingChannelCreateValidator = [
    check('name')
        .isLength({min: 2})
        .withMessage('Name must not be empty and min 2 character.')
        .trim()
        .custom(async (value) => {
            try{
                const result = await SellingChannel.find({name: { $regex : new RegExp("^" + value + "$", 'i') }})
                if(result.length) {
                    throw createHttpError('Name already exist')
                }
            }catch (err) {
                throw createHttpError(err.message)
            }
        }),
    check('destination.platform')
        .isLength({min: 3})
        .withMessage('Platform must not be empty and min 2 character.')
        .trim(),
    check('destination.value')
        .isLength({min: 2})
        .withMessage('Platform value must not be empty and min 2 character.')
        .trim(),
    check('country')
        .isLength({min: 2})
        .withMessage('Country must not be empty and min 2 character.')
        .trim()
]

// selling channel edit validator
const sellingChannelUpdateValidator = [
    check('name')
        .isLength({min: 2})
        .withMessage('Name must not be empty and min 2 character.')
        .trim()
        .optional({nullable: true}),
    check('destination.platform')
        .isLength({min: 3})
        .withMessage('Destination platform must not be empty and min 2 character.')
        .trim()
        .optional({nullable: true}),
    check('destination.value')
        .isLength({min: 2})
        .withMessage('Destination value must not be empty and min 2 character.')
        .trim()
        .optional({nullable: true}),
    check('country')
        .isLength({min: 2})
        .withMessage('Country must not be empty and min 2 character.')
        .trim()
        .optional({nullable: true})
]

// selling channel validation handler
const sellingChannelValidationHandler = (req, res, next) => {
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
    sellingChannelCreateValidator,
    sellingChannelUpdateValidator,
    sellingChannelValidationHandler
}