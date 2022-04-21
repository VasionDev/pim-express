// internal import 
const Choice = require("../choice/Choice")
const Attribute = require("./Attribute")

const createChoiceMeta = (choiceList=[]) => {
    const metaData = []
    choiceList.forEach(choice => {
        metaData.push({name: choice.name, suffix: choice.suffix ? choice.suffix : ''})
    })
    return metaData
}

// create bulk choice
const createBulkChoice = async (data =[]) => {
    try {
        const result = await Choice.insertMany(data)
        let IdsArray = []
        IdsArray = result.map(list => list.id);
        return IdsArray;
    }catch (err) {
        return []
    }
}

/**
 * Create new Attribute
 * @param attributeData 
 * @returns Successful message or Error
 */
const add = async (attributeData) => {
    try {
        const selectedChoice = []
        if(attributeData.choices && attributeData.choices.length) {
            // const filterChoice = [...new Set(attributeData.choices)]
            const data = createChoiceMeta(attributeData.choices)
            const choiceIds = await createBulkChoice(data)
            selectedChoice.push(...choiceIds)
        }
        console.log(selectedChoice)
        const newAttribute = new Attribute({
            name: attributeData.name,
            choices: selectedChoice
        })
        const createdAttribute = await newAttribute.save()
        await Choice.updateMany({ "_id": { "$in": selectedChoice }}, {"attribute": createdAttribute.id})
        await createdAttribute.populate({path: 'choices', options: {sort: {name:1}}})
        return {data: {...createdAttribute._doc}, success: 'Attribute added successfully', status: 200}
    }catch(err) {
        return {msg: err.message, status: 500}
    }
}

/**
 * Edit/Update Attribute
 * @param attributeID 
 * @param attributeData 
 * @returns Updated attribute data or error message
 */

const edit = async (attributeID, attributeData) => {
   
    try {
        const result = await Attribute.findOne({name: new RegExp(`^${attributeData.name}$`, 'i')})
        if(result !== null) {
            if(result.id !== attributeID) {
                throw Error(`${result.name} attribute is already exist`)
            }
        }

        const attrData = await Attribute.findById(attributeID).populate('choices')
        if(attrData) {
            attrData.name = (attributeData.name && attributeData.name != '') ? attributeData.name : attrData.name
            const availableChoices = attrData.choices.map(choice => choice.name);
            if(attributeData.choices && Array.isArray(attributeData.choices)) {
                // const filterChoice = [...new Set(attributeData.choices)]
                const filterChoice = attributeData.choices
                const matchedChoices = filterChoice.filter(choice => {
                    return availableChoices.indexOf(choice.name) !== -1;
                });
                if(matchedChoices.length) {
                    return {data: matchedChoices, message: 'Some choices are already exist', status: 409}
                }
                const data = await createChoiceMeta(filterChoice)
                const choiceIds = await createBulkChoice(data)
                attrData.choices = [...attrData.choices, ...choiceIds]
                await Choice.updateMany({ "_id": { "$in": choiceIds }}, {"attribute": attributeID})
            }
            await attrData.save() 
            await attrData.populate({path: 'choices', options: {sort: {name:1}}})
            return {data: {...attrData._doc}, success: 'Attribute updated successfully', status: 200}
        }else {
            return {msg: 'Content not found', status: 404}
        }
    }catch (err) {
        return {msg: err.message, status: 500}
    }
}

/**
 * Get all Attributes
 * @returns All Attributes data
 */
const getList = async () => {
    try {
        const attributes = await Attribute.find().sort({name: 1}).populate({path: 'choices', options: {sort: {name:1}}})
        return {data: [...attributes], status: 200}
    }catch (err) {
        return {msg: err.message, status: 500}
    }
}

/**
 * Get all Attributes by attribute ID
 * @param attributeID 
 * @returns attribute data / Error message
 */
const getOne = async (attributeID) => {

    try {
        const attribute = await Attribute.findById(attributeID).populate({path: 'choices', options: {sort: {name:1}}})
        if(attribute !== null ){
            return {data: {...attribute._doc}, status: 200}
        }
        throw Error('Attribute not found!')
    }catch (err) {
        return {msg: err.message, status: 500}
    }
}

/**
 * 
 * @param attributeID 
 * @returns Deleted attribute data or error message
*/
const deleteOne = async (attributeID) => {
    try {
        const deletedAttribute = await Attribute.findByIdAndDelete(attributeID)
        if(deletedAttribute !== null ){
            await Choice.deleteMany({attribute: attributeID})
            return {data: {...deletedAttribute._doc}, success: `${deletedAttribute.name} Attribute deleted successfully`, status: 200}
        }
        throw Error('Attribute not found!')
    }catch (err){
        return {msg: err.message, status: 500}
    }
}

module.exports = {
    add,
    edit,
    getList,
    getOne,
    deleteOne
}