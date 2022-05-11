// internal import 
const { MediaCategory, MediaInput } = require("./Media")

/**
 * Create new media category
 * @param data 
 * @returns Successful message or Error
 */
const addMediaCategory = async (data) => {
    try {
        const newMediaCategory = await new MediaCategory({
            ...data
        }).save()
        return {data: {...newMediaCategory._doc}, success: 'Media category added successfully', status: 200}
    }catch(err) {
        return {msg: err.message, status: 500}
    }
}

/**
 * Create new media
 * @param id 
 * @param data 
 * @returns Successful message or Error
 */
const addMedia = async (id, data) => {
    try {
        const mediaCat = await MediaCategory.findById(id)
        if(!mediaCat) return {msg: 'Media category not found', status: 404}
        const newMedia = await new MediaInput({
            ...data,
            category: id
        }).save()
        mediaCat.media = [...mediaCat.media, newMedia.id]
        await mediaCat.save()
        return {data: {...newMedia._doc}, success: 'Media added successfully', status: 200}
    }catch(err) {
        return {msg: err.message, status: 500}
    }
}

/**
 * Edit/Update media category
 * @param id 
 * @param data 
 * @returns Updated media category or error message
 */

const editMediaCategory = async (id, data) => {
   
    try {
        let result
        if(data.name && data.name !== "") {
            result = await MediaCategory.findOne({name: new RegExp(`^${data.name}$`, 'i')})
            if(result !== null) {
                if(result.id !== id) {
                    throw Error(`${result.name} media category is already exist`)
                }
            }
        }
        const mediaCategory = await MediaCategory.findByIdAndUpdate(id, {
            ...data
        }, {new: true})
        return {data: {...mediaCategory._doc}, success: 'Media category updated successfully', status: 200}
    }catch (err) {
        return {msg: err.message, status: 500}
    }
}

/**
 * Edit/Update media
 * @param id 
 * @param data 
 * @returns Updated media or error message
 */

const editMedia = async (id, data) => {
   
    try {
        if(data.name && data.name !== "") {
            const result = await MediaInput.findOne({name: new RegExp(`^${data.name}$`, 'i')})
            if(result !== null) {
                if(result.id !== id) {
                    throw Error(`${result.name} media is already exist`)
                }
            }
        }
        const media = await MediaInput.findByIdAndUpdate(id, {
            ...data,
        }, {new: true})
        return {data: {...media._doc}, success: 'Media updated successfully', status: 200}
    }catch (err) {
        return {msg: err.message, status: 500}
    }
}

/**
 * Get all Media
 * @returns All media data
 */
const getCategoryList = async () => {
    try {
        const media = await MediaCategory.find().sort({name:1}).populate({path:'media', options: {sort: {name:1}}})
        console.log(media[0].media)
        return {data: [...media], status: 200}
    }catch (err) {
        return {msg: err.message, status: 500}
    }
}

/**
 * Get all Media
 * @returns All media data
 */
const getMediaList = async () => {
    try {
        const media = await MediaInput.find().sort({name:1})
        return {data: [...media], status: 200}
    }catch (err) {
        return {msg: err.message, status: 500}
    }
}

/**
 * Get media by ID
 * @param id 
 * @returns media data / Error message
 */
const getCategory = async (id) => {
    try {
        const media = await MediaCategory.findById(id).populate({path:'media', options: {sort: {name:1}}})
        if(media !== null ){
            return {data: {...media._doc}, status: 200}
        }
        throw Error('Media not found!')
    }catch (err) {
        return {msg: err.message, status: 500}
    }
}

/**
 * Get media by ID
 * @param id 
 * @returns media data / Error message
 */
const getMedia = async (id) => {
    try {
        const media = await MediaInput.findById(id)
        if(media !== null ){
            return {data: {...media._doc}, status: 200}
        }
        throw Error('Media not found!')
    }catch (err) {
        return {msg: err.message, status: 500}
    }
}

/**
 * 
 * @param id 
 * @returns Deleted media or error message
*/
const deleteMediaCat = async (id) => {
    try {
        const mediaList = await MediaInput.find({category: id})
        if(mediaList.length) throw Error("Can't delete. Media exists on this category")
        const deletedMedia = await MediaCategory.findByIdAndDelete(id)
        if(deletedMedia !== null ){
            return {data: {...deletedMedia._doc}, success: `${deletedMedia.name} media deleted successfully`, status: 200}
        }
        throw Error('Media not found!')
    }catch (err){
        return {msg: err.message, status: 500}
    }
}

/**
 * 
 * @param id 
 * @returns Deleted media or error message
*/
const deleteMediaById = async (id) => {
    try {
        const deletedMedia = await MediaInput.findByIdAndDelete(id)
        if(deletedMedia !== null ){
            await MediaCategory.updateOne({media: id}, {$pull: {media: id}})
            return {data: {...deletedMedia._doc}, success: `${deletedMedia.name} media deleted successfully`, status: 200}
        }
        throw Error('Media not found!')
    }catch (err){
        return {msg: err.message, status: 500}
    }
}

module.exports = {
    addMediaCategory,
    addMedia,
    editMediaCategory,
    editMedia,
    getCategoryList,
    getMediaList,
    getCategory,
    getMedia,
    deleteMediaCat,
    deleteMediaById
}