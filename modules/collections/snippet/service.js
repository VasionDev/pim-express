// internal import 

const { SnippetCategory, TextSnippet } = require("./Snippet")

/**
 * Create new snippet category
 * @param data 
 * @returns Successful message or Error
 */
const addSnippetCategory = async (data) => {
    try {
        const newSnippetCategory = await new SnippetCategory({
            ...data
        }).save()
        return {data: {...newSnippetCategory._doc}, success: 'Snippet category added successfully', status: 200}
    }catch(err) {
        return {msg: err.message, status: 500}
    }
}

/**
 * Create new text snippet
 * @param id 
 * @param data 
 * @returns Successful message or Error
 */
const addSnippet = async (id, data) => {
    try {
        const snippetCat = await SnippetCategory.findById(id)
        if(!snippetCat) return {msg: 'Snippet category not found', status: 404}
        const newSnippetText = await new TextSnippet({
            ...data,
            category: id
        }).save()
        snippetCat.textSnippets = [...snippetCat.textSnippets, newSnippetText.id]
        await snippetCat.save()
        return {data: {...newSnippetText._doc}, success: 'Snippet added successfully', status: 200}
    }catch(err) {
        return {msg: err.message, status: 500}
    }
}

/**
 * Edit/Update snippet category
 * @param id 
 * @param data 
 * @returns Updated snippet category or error message
 */

const editSnippetCategory = async (id, data) => {
    try {
        let result
        if(data.name && data.name !== "") {
            result = await SnippetCategory.findOne({name: new RegExp(`^${data.name}$`, 'i')})
            if(result !== null) {
                if(result.id !== id) {
                    throw Error(`${result.name} snippet category is already exist`)
                }
            }
        }
        const snippetCategory = await SnippetCategory.findByIdAndUpdate(id, {
            ...data
        }, {new: true})
        return {data: {...snippetCategory._doc}, success: 'Snippet category updated successfully', status: 200}
    }catch (err) {
        return {msg: err.message, status: 500}
    }
}

/**
 * Edit/Update snippet text
 * @param id 
 * @param data 
 * @returns Updated snippet text or error message
 */

const editSnippetText = async (id, data) => {
   
    try {
        if(data.name && data.name !== "") {
            const result = await TextSnippet.findOne({name: new RegExp(`^${data.name}$`, 'i')})
            if(result !== null) {
                if(result.id !== id) {
                    throw Error(`${result.name} snippet is already exist`)
                }
            }
        }
        if(data.snippetId && data.snippetId !== "") {
            const result = await TextSnippet.findOne({snippetId: new RegExp(`^${data.snippetId}$`, 'i')})
            if(result !== null) {
                if(result.id !== id) {
                    throw Error(`${result.snippetId} snippet ID is already exist`)
                }
            }
        }
        const textSnippet = await TextSnippet.findByIdAndUpdate(id, {
            ...data,
        }, {new: true})
        return {data: {...textSnippet._doc}, success: 'Snippet updated successfully', status: 200}
    }catch (err) {
        return {msg: err.message, status: 500}
    }
}

/**
 * Get all snippet
 * @returns All snippet data
 */
const getCategoryList = async () => {
    try {
        const snippet = await SnippetCategory.find().sort({name:1}).populate({path:'textSnippets', options: {sort: {name:1}}})
        return {data: [...snippet], status: 200}
    }catch (err) {
        return {msg: err.message, status: 500}
    }
}

/**
 * Get all snippet text
 * @returns All text snippet
 */
const getSnippetList = async () => {
    try {
        const snippet = await TextSnippet.find().sort({name:1})
        return {data: [...snippet], status: 200}
    }catch (err) {
        return {msg: err.message, status: 500}
    }
}

/**
 * Get snippet by cat ID
 * @param id 
 * @returns snippet data / Error message
 */
const getCategory = async (id) => {
    try {
        const snippet = await SnippetCategory.findById(id).populate({path:'textSnippets', options: {sort: {name:1}}})
        if(snippet !== null ){
            return {data: {...snippet._doc}, status: 200}
        }
        throw Error('Snippet not found!')
    }catch (err) {
        return {msg: err.message, status: 500}
    }
}

/**
 * Get snippet by ID
 * @param id 
 * @returns snippet data / Error message
 */
const getSnippet = async (id) => {
    try {
        const snippet = await TextSnippet.findById(id)
        if(snippet !== null ){
            return {data: {...snippet._doc}, status: 200}
        }
        throw Error('Snippet not found!')
    }catch (err) {
        return {msg: err.message, status: 500}
    }
}

/**
 * 
 * @param id 
 * @returns Deleted snippet cat or error message
*/
const deleteSnippetCat = async (id) => {
    try {
        const snippetList = await TextSnippet.find({category: id})
        if(snippetList.length) throw Error("Can't delete. Text snippet exists on this category")
        const deletedSnippet = await SnippetCategory.findByIdAndDelete(id)
        if(deletedSnippet !== null ){
            return {data: {...deletedSnippet._doc}, success: `${deletedSnippet.name} snippet deleted successfully`, status: 200}
        }
        throw Error('Snippet not found!')
    }catch (err){
        return {msg: err.message, status: 500}
    }
}

/**
 * 
 * @param id 
 * @returns Deleted snippet or error message
*/
const deleteSnippetById = async (id) => {
    try {
        const deletedSnippet = await TextSnippet.findByIdAndDelete(id)
        if(deletedSnippet !== null ){
            await SnippetCategory.updateOne({textSnippets: id}, {$pull: {textSnippets: id}})
            return {data: {...deletedSnippet._doc}, success: `${deletedSnippet.name} snippet deleted successfully`, status: 200}
        }
        throw Error('Snippet not found!')
    }catch (err){
        return {msg: err.message, status: 500}
    }
}

module.exports = {
    addSnippetCategory,
    addSnippet,
    editSnippetCategory,
    editSnippetText,
    getCategoryList,
    getSnippetList,
    getCategory,
    getSnippet,
    deleteSnippetCat,
    deleteSnippetById
}