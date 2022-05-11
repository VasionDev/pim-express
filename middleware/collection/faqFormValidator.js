// external import
const { check, validationResult } = require("express-validator");
const createHttpError = require("http-errors");
const { FaqCategory, Faq } = require("../../modules/collections/faq/Faq");

// faq category validator
const faqCategoryValidator = [
    check('name')
        .isLength({min: 2})
        .withMessage('Faq category name must not be empty and min 2 character.')
        .trim()
        .custom(async (value) => {
            try{
                const result = await FaqCategory.find({name: { $regex : new RegExp("^" + value + "$", 'i') }})
                if(result.length) {
                    throw createHttpError('Faq category name already exist')
                }
            }catch (err) {
                throw createHttpError(err.message)
            }
        })
]

// faq category edit validator
const faqCategoryUpdateValidator = [
    check('name')
        .isLength({min: 2})
        .withMessage('Faq category name must not be empty and min 2 character.')
        .trim()
        .optional({nullable: true})
]

// faq validator
const faqValidator = [
    check('question')
        .isLength({min: 5})
        .withMessage('Faq question must not be empty and min 5 character.')
        .trim()
        .custom(async (value) => {
            try{
                const result = await Faq.find({question: { $regex : new RegExp("^" + value + "$", 'i') }})
                if(result.length) {
                    throw createHttpError('Faq already exist')
                }
            }catch (err) {
                throw createHttpError(err.message)
            }
        })
]

// faq edit validator
const faqUpdateValidator = [
    check('question')
        .isLength({min: 2})
        .withMessage('Faq question must not be empty and min 2 character.')
        .trim()
        .optional({nullable: true})
]


// faq validation handler
const faqValidationHandler = (req, res, next) => {
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
    faqCategoryValidator,
    faqCategoryUpdateValidator,
    faqValidator,
    faqUpdateValidator,
    faqValidationHandler
}