// internal import
const PriceList = require("./PriceList")

/**
 * add new price list
 * @param data 
 * @returns Successful message or Error
 */
const addPriceList = async (data) => {
    try {
        const newPriceList = await new PriceList({
            ...data
        }).save()
        return {data: {...newPriceList._doc}, success: 'Price list added successfully', status: 200}
    }catch(err) {
        return {msg: err.message, status: 500}
    }
}

/**
 * Edit/Update price list
 * @param id 
 * @param data 
 * @returns Updated price list or error message
 */

const editPriceList = async (id, data) => {
    try {
        if(data.name && data.name !== "") {
            const result = await PriceList.findOne({name: new RegExp(`^${data.name}$`, 'i')})
            if(result !== null) {
                if(result.id !== id) {
                    throw Error(`${result.name} Price list is already exist`)
                }
            }
        }
        const priceList = await PriceList.findByIdAndUpdate(id, {
            ...data,
        }, {new: true})
        return {data: {...priceList._doc}, success: 'price list updated successfully', status: 200}
    }catch (err) {
        return {msg: err.message, status: 500}
    }
}

/**
 * Get all price list
 * @returns All price list
 */
const getAllPriceList = async () => {
    try {
        const priceList = await PriceList.find().sort({name:1})
        return {data: [...priceList], status: 200}
    }catch (err) {
        return {msg: err.message, status: 500}
    }
}

/**
 * Get price list by ID
 * @param id 
 * @returns price list data / Error message
 */
const getPriceList = async (id) => {
    try {
        const priceList = await PriceList.findById(id)
        if(priceList !== null ){
            return {data: {...priceList._doc}, status: 200}
        }
        throw Error('Price list not found!')
    }catch (err) {
        return {msg: err.message, status: 500}
    }
}

/**
 * 
 * @param id 
 * @returns Deleted price list or error message
*/
const deletePriceList = async (id) => {
    try {
        const deletedPriceList = await PriceList.findByIdAndDelete(id)
        if(deletedPriceList !== null ){
            return {data: {...deletedPriceList._doc}, success: `Price list deleted successfully`, status: 200}
        }
        throw Error('Price list not found!')
    }catch (err){
        return {msg: err.message, status: 500}
    }
}

module.exports = {
    addPriceList,
    editPriceList,
    getAllPriceList,
    getPriceList,
    deletePriceList
}