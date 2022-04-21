// external import
const { check, validationResult } = require("express-validator");
const createHttpError = require("http-errors");

// internal import
const Team = require("../../modules/team/Team");

// team form validator
const teamFormValidator = [
    check('name')
        .isLength({min: 2})
        .withMessage('Name must not be empty and min 2 character.')
        .trim()
        .custom(async (value) => {
            try{
                const result = await Team.find({name: { $regex : new RegExp("^" + value + "$", 'i') }})
                if(result.length) {
                    throw createHttpError('Team name already exist')
                }
            }catch (err) {
                throw createHttpError(err.message)
            }
        })
]

// team form validation handler
const teamValidationHandler = (req, res, next) => {
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
    teamFormValidator,
    teamValidationHandler,
}