// external import
const { check, validationResult } = require("express-validator");
const createHttpError = require("http-errors");
const PriceList = require("../../modules/collections/priceList/PriceList");

// price list create validator
const priceListAddValidator = [
    check('name')
        .isLength({min: 2})
        .withMessage('Name must not be empty and min 2 character.')
        .trim()
        .custom(async (value) => {
            try{
                const result = await PriceList.find({name: { $regex : new RegExp("^" + value + "$", 'i') }})
                if(result.length) {
                    throw createHttpError('Name already exist')
                }
            }catch (err) {
                throw createHttpError(err.message)
            }
        }),
    check('currency')
        .isLength({min: 2})
        .withMessage('Currency must not be empty and min 2 character.')
        .trim(),
    check('taxes')
        .isArray()
        .withMessage('taxes must be an array of object.')
        .optional({nullable: true}),
    check('taxes.*.name')
        .exists()
        .withMessage('tax/fee name must not be empty and min 2 character.')
        .isLength({min: 2})
        .withMessage('tax/fee name must not be empty and min 2 character.')
        .trim(),
    check('taxes.*.amount')
        .exists()
        .withMessage('amount must not be empty and numeric.')
        .isNumeric()
        .withMessage('amount must not be empty and numeric.')
        .trim(),
    check('taxes.*.evaluateIn')
        .exists()
        .withMessage('amount type must not be empty.')
        .isLength({min: 2})
        .withMessage('amount type must not be empty.')
        .trim()
]

// price list edit validator
const priceListEditValidator = [
    check('name')
        .isLength({min: 2})
        .withMessage('Name must not be empty and min 2 character.')
        .trim()
        .optional({nullable: true}),
    check('currency')
        .isLength({min: 2})
        .withMessage('Currency must not be empty and min 2 character.')
        .trim()
        .optional({nullable: true}),
    check('taxes')
        .isArray()
        .withMessage('taxes must be an array of object.')
        .optional({nullable: true}),
    check('taxes.*.name')
        .exists()
        .withMessage('tax/fee name must not be empty and min 2 character.')
        .isLength({min: 2})
        .withMessage('tax/fee name must not be empty and min 2 character.')
        .trim(),
    check('taxes.*.amount')
        .exists()
        .withMessage('amount must not be empty and numeric.')
        .isNumeric()
        .withMessage('amount must not be empty and numeric.')
        .trim(),
    check('taxes.*.evaluateIn')
        .exists()
        .withMessage('amount type must not be empty.')
        .isLength({min: 2})
        .withMessage('amount type must not be empty.')
        .trim()
]

// price list validation handler
const priceListValidationHandler = (req, res, next) => {
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
    priceListAddValidator,
    priceListEditValidator,
    priceListValidationHandler
}