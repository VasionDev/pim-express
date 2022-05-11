// internal import
const { FaqCategory, Faq } = require("./Faq")

/**
 * Create new faq category
 * @param data 
 * @returns Successful message or Error
 */
const addFaqCategory = async (data) => {
    try {
        const newFaqCategory = await new FaqCategory({
            ...data
        }).save()
        return {data: {...newFaqCategory._doc}, success: 'Faq category added successfully', status: 200}
    }catch(err) {
        return {msg: err.message, status: 500}
    }
}

/**
 * Create new faq
 * @param id 
 * @param data 
 * @returns Successful message or Error
 */
const addFaq = async (id, data) => {
    try {
        const faqCat = await FaqCategory.findById(id)
        if(!faqCat) return {msg: 'Faq category not found', status: 404}
        const newFaq = await new Faq({
            ...data,
            category: id
        }).save()
        faqCat.faqs = [...faqCat.faqs, newFaq.id]
        await faqCat.save()
        return {data: {...newFaq._doc}, success: 'Faq added successfully', status: 200}
    }catch(err) {
        return {msg: err.message, status: 500}
    }
}

/**
 * Edit/Update faq category
 * @param id 
 * @param data 
 * @returns Updated faq category or error message
 */

const editFaqCategory = async (id, data) => {
    try {
        let result
        if(data.name && data.name !== "") {
            result = await FaqCategory.findOne({name: new RegExp(`^${data.name}$`, 'i')})
            if(result !== null) {
                if(result.id !== id) {
                    throw Error(`${result.name} faq category is already exist`)
                }
            }
        }
        const faqCategory = await FaqCategory.findByIdAndUpdate(id, {
            ...data
        }, {new: true})
        return {data: {...faqCategory._doc}, success: 'Faq category updated successfully', status: 200}
    }catch (err) {
        return {msg: err.message, status: 500}
    }
}

/**
 * Edit/Update faq
 * @param id 
 * @param data 
 * @returns Updated faq or error message
 */

const editFaq = async (id, data) => {
   
    try {
        if(data.question && data.question !== "") {
            const result = await Faq.findOne({question: new RegExp(`^${data.question}$`, 'i')})
            if(result !== null) {
                if(result.id !== id) {
                    throw Error(`${result.question} question is already exist`)
                }
            }
        }
        const faq = await Faq.findByIdAndUpdate(id, {
            ...data
        }, {new: true})
        return {data: {...faq._doc}, success: 'Faq updated successfully', status: 200}
    }catch (err) {
        return {msg: err.message, status: 500}
    }
}

/**
 * Get all faq
 * @returns All faq data
 */
const getCategoryList = async () => {
    try {
        const faq = await FaqCategory.find().sort({name:1}).populate({path:'faqs', options: {sort: {question:1}}})
        return {data: [...faq], status: 200}
    }catch (err) {
        return {msg: err.message, status: 500}
    }
}

/**
 * Get all faq
 * @returns All faq
 */
const getFaqList = async () => {
    try {
        const faq = await Faq.find().sort({question:1})
        return {data: [...faq], status: 200}
    }catch (err) {
        return {msg: err.message, status: 500}
    }
}

/**
 * Get faq by cat ID
 * @param id 
 * @returns faq data / Error message
 */
const getFaqCategory = async (id) => {
    try {
        const faq = await FaqCategory.findById(id).populate({path:'faqs', options: {sort: {question:1}}})
        if(faq !== null ){
            return {data: {...faq._doc}, status: 200}
        }
        throw Error('Faq category not found!')
    }catch (err) {
        return {msg: err.message, status: 500}
    }
}

/**
 * Get faq by ID
 * @param id 
 * @returns faq data / Error message
 */
const getFaq = async (id) => {
    try {
        const faq = await Faq.findById(id)
        if(faq !== null ){
            return {data: {...faq._doc}, status: 200}
        }
        throw Error('Faq not found!')
    }catch (err) {
        return {msg: err.message, status: 500}
    }
}

/**
 * 
 * @param id 
 * @returns Deleted faq cat or error message
*/
const deleteFaqCat = async (id) => {
    try {
        const faqList = await Faq.find({category: id})
        if(faqList.length) throw Error("Can't delete. Faqs exists on this category")
        const deletedFaq = await FaqCategory.findByIdAndDelete(id)
        if(deletedFaq !== null ){
            return {data: {...deletedFaq._doc}, success: `${deletedFaq.name} faq deleted successfully`, status: 200}
        }
        throw Error('Faq category not found!')
    }catch (err){
        return {msg: err.message, status: 500}
    }
}

/**
 * 
 * @param id 
 * @returns Deleted faq or error message
*/
const deleteFaqById = async (id) => {
    try {
        const deletedFaq = await Faq.findByIdAndDelete(id)
        if(deletedFaq !== null ){
            await FaqCategory.updateOne({faqs: id}, {$pull: {faqs: id}})
            return {data: {...deletedFaq._doc}, success: `Faq deleted successfully`, status: 200}
        }
        throw Error('Faq not found!')
    }catch (err){
        return {msg: err.message, status: 500}
    }
}

module.exports = {
    addFaqCategory,
    addFaq,
    editFaqCategory,
    editFaq,
    getCategoryList,
    getFaqList,
    getFaqCategory,
    getFaq,
    deleteFaqCat,
    deleteFaqById
}