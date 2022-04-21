// external import
const { check, validationResult } = require("express-validator");
const createHttpError = require("http-errors");
const Segment = require("../../models/Segment");

// internal import
const Team = require("../../models/Team");

// segment form validator
const segmentFormValidator = [
    check('name')
        .isLength({min: 2})
        .withMessage('Segment name must not be empty and min 2 character.')
        .trim()
        .custom(async (value) => {
            try{
                const result = await Segment.find({name: { $regex : new RegExp("^" + value + "$", 'i') }})
                if(result.length) {
                    throw createHttpError('Segment name already exist')
                }
            }catch (err) {
                throw createHttpError(err.message)
            }
        }),
]

// segment form validation handler
const segmentValidationHandler = (req, res, next) => {
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
    segmentFormValidator,
    segmentValidationHandler,
}