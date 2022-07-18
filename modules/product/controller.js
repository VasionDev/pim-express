const { addProduct, getProductList, getProduct, editProduct, deleteProduct } = require("./service")

const createProduct = async (req, res, next) => {
    const response = await addProduct(req.body)
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

const getAllProduct = async (req, res, next) => {
    const response = await getProductList()
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

const productById = async (req, res, next) => {
    const response = await getProduct(req.params.id)
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

const updateProduct = async (req, res, next) => {
    const response = await editProduct(req.params.id, req.body)
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


const removeProduct = async (req, res, next) => {
    const response = await deleteProduct(req.params.id)
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
    createProduct,
    getAllProduct,
    productById,
    updateProduct,
    removeProduct
}