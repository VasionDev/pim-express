// internal import

const SellingChannel = require("./SellingChannel")


/**
 * add new selling channel
 * @param data 
 * @returns Successful message or Error
 */
const addSellingChannel = async (data) => {
    try {
        const newChannel = await new SellingChannel({
            ...data
        }).save()
        return {data: {...newChannel._doc}, success: 'Selling channel added successfully', status: 200}
    }catch(err) {
        return {msg: err.message, status: 500}
    }
}

/**
 * Edit/Update selling channel
 * @param id 
 * @param data 
 * @returns Updated selling channel or error message
 */

const editSellingChannel = async (id, data) => {
    try {
        if(data.name && data.name !== "") {
            const result = await SellingChannel.findOne({name: new RegExp(`^${data.name}$`, 'i')})
            if(result !== null) {
                if(result.id !== id) {
                    throw Error(`${result.name} Selling channel is already exist`)
                }
            }
        }
        const channel = await SellingChannel.findByIdAndUpdate(id, {
            ...data,
        }, {new: true})
        return {data: {...channel._doc}, success: 'Selling channel updated successfully', status: 200}
    }catch (err) {
        return {msg: err.message, status: 500}
    }
}

/**
 * Get all selling channel
 * @returns All selling channel list
 */
const getSellingChannelList = async () => {
    try {
        const sellingChannels = await SellingChannel.find().sort({name:1})
        return {data: [...sellingChannels], status: 200}
    }catch (err) {
        return {msg: err.message, status: 500}
    }
}

/**
 * Get selling channel by ID
 * @param id 
 * @returns selling channel data / Error message
 */
const getSellingChannel = async (id) => {
    try {
        const sellingChannel = await SellingChannel.findById(id)
        if(sellingChannel !== null ){
            return {data: {...sellingChannel._doc}, status: 200}
        }
        throw Error('Selling Channel not found!')
    }catch (err) {
        return {msg: err.message, status: 500}
    }
}

/**
 * 
 * @param id 
 * @returns Deleted selling channel or error message
*/
const deleteSellingChannel = async (id) => {
    try {
        const deletedChannel = await SellingChannel.findByIdAndDelete(id)
        if(deletedChannel !== null ){
            return {data: {...deletedChannel._doc}, success: `Selling channel deleted successfully`, status: 200}
        }
        throw Error('Selling channel not found!')
    }catch (err){
        return {msg: err.message, status: 500}
    }
}

module.exports = {
    addSellingChannel,
    editSellingChannel,
    getSellingChannelList,
    getSellingChannel,
    deleteSellingChannel
}