// internal import 
const Tag = require('./Tag')

const createTagMeta = (tagList=[]) => {
    const metaData = []
    tagList.forEach(tag => {
        metaData.push({name: tag})
    })
    return metaData
}

/**
 * Create new Tag
 * @param tagName 
 * @returns Successful message or Error
 */
const add = async (tagName) => {
    try {
        let newTag
        newTag = new Tag({name: tagName})
        const createdTag = await newTag.save()
        return {data: {...createdTag._doc}, success: 'Tag added successfully', status: 200}
    }catch(err) {
        return {msg: err.message, status: 500}
    }
}

/**
 * 
 * @param {*} tagNames 
 * @returns created tag list or error message 
 */
const bulkAdd = async (tagNames=[]) => {
    try {
        const storedtags = await Tag.find().sort({updatedAt: -1})
        const availableTags = storedtags.map(tag => tag.name);
        const filterTag = [...new Set(tagNames)]
        const matchedTags = filterTag.filter(tag => {
            return availableTags.indexOf(tag) !== -1;
        });
        if(matchedTags.length) {
            return {data: matchedTags, message: 'Some tags are already exist', status: 409}
        }
        const data = createTagMeta(filterTag)
        const tags = await Tag.insertMany(data)
        return {data: [...tags], success: 'Tags added successfully', status: 200}
    }catch (err) {
        return {msg: err.message, status: 500}
    }
}

/**
 * Edit/Update Tag
 * @param tagID 
 * @param tagName 
 * @returns Updated Tag data or error message
 */

const edit = async (tagID, tagName) => {
   
    try {
        const result = await Tag.findOne({name: new RegExp(`^${tagName}$`, 'i')})
        if(result !== null) {
            if(result.id !== tagID) {
                throw Error(`${result.name} tag is already exist`)
            }
        }

        const tag = await Tag.findByIdAndUpdate(tagID, {
            name: tagName
        }, {new: true})

        return {data: {...tag._doc}, success: 'Tag updated successfully', status: 200}
    }catch (err) {
        return {msg: err.message, status: 500}
    }
}

/**
 * Get all Tags
 * @returns All Tag data
 */
const getList = async () => {
    try {
        const tags = await Tag.find().sort({updatedAt: -1})
        return {data: [...tags], status: 200}
    }catch (err) {
        return {msg: err.message, status: 500}
    }
}

/**
 * Get tag by tag ID
 * @param tagID 
 * @returns tag data / Error message
 */
const getOne = async (tagID) => {

    try {
        const tag = await Tag.findById(tagID)
        if(tag !== null ){
            return {data: {...tag._doc}, status: 200}
        }
        throw Error('Tag not found!')
    }catch (err) {
        return {msg: err.message, status: 500}
    }
}

/**
 * 
 * @param tagID 
 * @returns Deleted tag data or error message
*/
const deleteOne = async (tagID) => {
    try {
        const deletedTag = await Tag.findByIdAndDelete(tagID)
        if(deletedTag !== null ){
            return {data: {...deletedTag._doc}, success: `${deletedTag.name} Tag deleted successfully`, status: 200}
        }
        throw Error('Tag not found!')
    }catch (err){
        return {msg: err.message, status: 500}
    }
}

module.exports = {
    add,
    bulkAdd,
    edit,
    getList,
    getOne,
    deleteOne,
}