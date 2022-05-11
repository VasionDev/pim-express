// external import
const { check, validationResult } = require("express-validator");
const createHttpError = require("http-errors");
const { SnippetCategory, TextSnippet } = require("../../modules/collections/snippet/Snippet");


// snippet category validator
const snippetCategoryValidator = [
    check('name')
        .isLength({min: 2})
        .withMessage('Snippet category name must not be empty and min 2 character.')
        .trim()
        .custom(async (value) => {
            try{
                const result = await SnippetCategory.find({name: { $regex : new RegExp("^" + value + "$", 'i') }})
                if(result.length) {
                    throw createHttpError('Snippet category name already exist')
                }
            }catch (err) {
                throw createHttpError(err.message)
            }
        })
]

// snippet category edit validator
const snippetCategoryUpdateValidator = [
    check('name')
        .isLength({min: 2})
        .withMessage('Snippet category name must not be empty and min 2 character.')
        .trim()
        .optional({nullable: true})
]

// snippet text validator
const snippetTextValidator = [
    check('name')
        .isLength({min: 2})
        .withMessage('Snippet name must not be empty and min 2 character.')
        .trim()
        .custom(async (value) => {
            try{
                const result = await TextSnippet.find({name: { $regex : new RegExp("^" + value + "$", 'i') }})
                if(result.length) {
                    throw createHttpError('Snippet name already exist')
                }
            }catch (err) {
                throw createHttpError(err.message)
            }
        }),
    check('snippetId')
        .isLength({min: 2})
        .withMessage('Snippet id must not be empty and min 2 character.')
        .trim()
        .custom(async (value) => {
            try{
                const result = await TextSnippet.find({snippetId: { $regex : new RegExp("^" + value + "$", 'i') }})
                if(result.length) {
                    throw createHttpError('Snippet ID already exist')
                }
            }catch (err) {
                throw createHttpError(err.message)
            }
        })
]

// snippet text edit validator
const snippetTextUpdateValidator = [
    check('name')
        .isLength({min: 2})
        .withMessage('Snippet name must not be empty and min 2 character.')
        .trim()
        .optional({nullable: true}),
    check('snippetId')
        .isLength({min: 2})
        .withMessage('Snippet ID must not be empty and min 2 character.')
        .trim()
        .optional({nullable: true})
]


// snippet validation handler
const snippetValidationHandler = (req, res, next) => {
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
    snippetCategoryValidator,
    snippetCategoryUpdateValidator,
    snippetTextValidator,
    snippetTextUpdateValidator,
    snippetValidationHandler
}