// external import
const { check, validationResult } = require("express-validator");
const createHttpError = require("http-errors");

// internal import
const Category = require("../../modules/collections/category/Category");

// category form validator
const categoryFormValidator = [
    check('name')
        .isLength({min: 2})
        .withMessage('Category name must not be empty and min 2 character.')
        .trim()
        .custom(async (value) => {
            try{
                const result = await Category.find({name: { $regex : new RegExp("^" + value + "$", 'i') }})
                if(result.length) {
                    throw createHttpError('Category name already exist')
                }
            }catch (err) {
                throw createHttpError(err.message)
            }
        }),
    check('subCategories')
        .isArray()
        .withMessage('Sub categories must be an array.')
        .optional({nullable: true})
        .custom(async (value) => {
            const insesitiveNames = [];
            value.forEach(item => {
                let re = new RegExp("^" + item + "$", 'i');
                insesitiveNames.push(re);    
            })
            try{
                const result = await Category.find({name: {$in: insesitiveNames}}).select('name')
                const existList = []
                if(result.length) {
                    result.forEach(list=>{
                        existList.push(list.name)
                    })
                    throw createHttpError(`${existList} categories are already exist`)
                }
            }catch (err) {
                throw createHttpError(err.message)
            }
        }),
]

// category form validation handler
const categoryValidationHandler = (req, res, next) => {
    const errors = validationResult(req)
    // const mappedErrors = errors.mapped()
    const mappedErrors = errors.array()
    if(Object.keys(mappedErrors).length === 0 ) {
        next()
    }else {
        res.status(500).json({
            errors: {common: mappedErrors[0]}
        })
    }
}

// category bulk form validator
const categoryBulkFormValidator = [
    check('data')
        .isArray()
        .withMessage('Categories must be an array.')
        .custom(async (value) => {
            const catList = []
            value.forEach(catEl=> {
                if(catEl.name && catEl.name!= ''){
                    catList.push(new RegExp("^" + catEl.name + "$", 'i'))
                    if(catEl.subCategories && catEl.subCategories.length) {
                        // catList.push(...catEl.subCategories)
                        catEl.subCategories.forEach(subCat=> {
                            catList.push(new RegExp("^" + subCat + "$", 'i'))
                        })
                    }
                }
            })
            /*const insesitiveNames = [];
            catList.forEach(item => {
                let re = new RegExp("^" + item + "$", 'i');
                insesitiveNames.push(re);    
            })*/
            try{
                const result = await Category.find({name: {$in: catList}}).select('name')
                const existList = []
                if(result.length) {
                    result.forEach(list=>{
                        existList.push(list.name)
                    })
                    throw createHttpError(`${existList} categories are already exist`)
                }
            }catch (err) {
                throw createHttpError(err.message)
            }
        }),
]

// category bulk form validation handler
const categoryBulkValidationHandler = (req, res, next) => {
    const errors = validationResult(req)
    // const mappedErrors = errors.mapped()
    const mappedErrors = errors.array()
    if(Object.keys(mappedErrors).length === 0 ) {
        next()
    }else {
        res.status(500).json({
            errors: {common: mappedErrors[0]}
        })
    }
}

const subCategoryValidation = async (req, res, next) => {
    const {parentId, data} = req.body
    if(parentId && (data && data.name!= '')) {
        try {
            const result = await Category.findById(parentId)
            if(result) {
                catData = await Category.find({name: { $regex : new RegExp("^" + data.name + "$", 'i') }})
                if(catData.length) {
                    res.status(409).json({errors: {common: {msg:'Category name already exist'}}})
                }else {
                    next()
                }
            }
        }catch (err) {
            res.status(500).json({errors: {common: {msg:'Something went wrong!'}}})
        }
    }else {
        res.status(500).json({
            errors: {common: {msg:'Parent Category ID & sub category name is required.'}}
        })
    }
}

module.exports = {
    categoryFormValidator,
    categoryValidationHandler,
    categoryBulkFormValidator,
    categoryBulkValidationHandler,
    subCategoryValidation
}