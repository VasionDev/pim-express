// internal import 

const { add, getList, getOne, edit, deleteOne, addMany, addSubCategory } = require("./categoryService")

// Create new Category
const createCategory = async (req, res, next) => {
    const response = await add(req.body)
    
    if(response.status === 200 ) {
        res.json(response)
    }else {
        res.status(response.status).json({
            errors: {
                common: response
            }
        })
    }
}

// create bulk category
const createBulkCategory = async (req, res, next) => {
    const response = await addMany(req.body.data)
    if(response.status === 200 ) {
        res.json(response)
    }else {
        res.status(response.status).json({
            errors: {
                common: response
            }
        })
    }
}

const createSubCategory = async (req, res, next) => {
    const {parentId, data} = req.body
    const response = await addSubCategory(parentId, data)
    res.json(response)
}

// Get all Category
const getCategories = async (req, res, next) => {
    const response = await getList()
    if(response.status === 200 ) {
        res.json(response)
    }else {
        res.status(response.status).json({
            errors: {
                common: response
            }
        })
    } 
}

// Get Category by cat ID
const categoryById = async (req, res, next) => {
    const response = await getOne(req.params.id)
    if(response.status === 200 ) {
        res.json(response)
    }else {
        res.status(response.status).json({
            errors: {
                common: response
            }
        })
    }
}

// edit category
const updateCategory = async (req, res, next) => {
    const response = await edit(req.params.id, req.body)
    if(response.status === 200 ) {
        res.json(response)
    }else {
        res.status(response.status).json({
            errors: {
                common: response
            }
        })
    }
}

// delete category
const deleteCategory = async (req, res, next) => {

    const response = await deleteOne(req.params.id)
    if(response.status === 200 ) {
        res.json(response)
    }else {
        res.status(response.status).json({
            errors: {
                common: response
            }
        })
    }
}

module.exports = {
    createCategory,
    createBulkCategory,
    getCategories,
    categoryById,
    updateCategory,
    deleteCategory,
    createSubCategory
}