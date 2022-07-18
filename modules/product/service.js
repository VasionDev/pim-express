// internal import
const { Product } = require("./Product")

// generate slug
const generateSlug = (name) => {
    let filterString = name.replace(/[^a-zA-Z0-9 ]/g, '')
    filterString = filterString.replace(/  +/g, ' ');
    return filterString.split(" ").join('-').toLowerCase()
}

/**
 * add new product
 * @param data 
 * @returns Successful message or Error
 */
const addProduct = async (data) => {
    try {
        const slug = generateSlug(data.name);
        const newProduct = await new Product({
            ...data,
            slug: slug
        }).save()
        return {data: {...newProduct._doc}, success: 'Product added successfully', status: 200}
    }catch(err) {
        return {msg: err.message, status: 500}
    }
}

/**
 * Edit/Update product
 * @param id 
 * @param data 
 * @returns Updated product or error message
 */

const editProduct = async (id, data) => {
    try {
        const slug = generateSlug(data.name);
        const product = await Product.findByIdAndUpdate(id, {
            ...data,
            slug: slug
        }, {new: true})
        return {data: {...product._doc}, success: 'Product updated successfully', status: 200}
    }catch (err) {
        return {msg: err.message, status: 500}
    }
}

/**
 * Get all products
 * @returns All product list
 */
const getProductList = async () => {
    try {
        const products = await Product.find().sort({name:1})
        return {data: [...products], status: 200}
    }catch (err) {
        return {msg: err.message, status: 500}
    }
}

/**
 * Get product by ID
 * @param id 
 * @returns product data / Error message
 */
const getProduct = async (id) => {
    try {
        const product = await Product.findById(id)
        if(product !== null ){
            return {data: {...product._doc}, status: 200}
        }
        throw Error('Product not found!')
    }catch (err) {
        return {msg: err.message, status: 500}
    }
}

/**
 * 
 * @param id 
 * @returns Deleted product or error message
*/
const deleteProduct = async (id) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(id)
        if(deletedProduct !== null ){
            return {data: {...deletedProduct._doc}, success: `Product deleted successfully`, status: 200}
        }
        throw Error('Product not found!')
    }catch (err){
        return {msg: err.message, status: 500}
    }
}

module.exports = {
    addProduct,
    editProduct,
    getProductList,
    getProduct,
    deleteProduct
}