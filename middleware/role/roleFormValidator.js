// external import
const { check, validationResult } = require("express-validator");
const createHttpError = require("http-errors");

// internal import
const Role = require("../../modules/role/Role");

// role form validator
const roleFormValidator = [
    check('name')
        .isLength({min: 2})
        .withMessage('Segment name must not be empty and min 2 character.')
        .trim()
        .custom(async (value) => {
            try{
                const result = await Role.find({name: { $regex : new RegExp("^" + value + "$", 'i') }})
                if(result.length) {
                    throw createHttpError('Role name already exist')
                }
            }catch (err) {
                throw createHttpError(err.message)
            }
        }),
]

// role form validation handler
const roleValidationHandler = (req, res, next) => {
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
    roleFormValidator,
    roleValidationHandler,
}