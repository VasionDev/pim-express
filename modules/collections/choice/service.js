const Attribute = require("../attribute/Attribute");
const Choice = require("./Choice");

const addChoiceToAttribute = async (attributeID, choiceData) => {
    try {
        const attrData = await Attribute.findById(attributeID).populate('choices')
        if(attrData) {
            const availableChoices = attrData.choices.map(choice => choice.name);
            if(availableChoices.indexOf(choiceData.name) !== -1) {
                return {msg: 'Choice name already exist', status: 409}
            }
            const newChoice = new Choice({
                ...choiceData,
                attribute: attributeID
            })
            const choice = await newChoice.save()
            attrData.choices = [...attrData.choices, choice.id]
            await attrData.save()
            // await attrData.populate('choices')
            return {data: {...choice._doc}, success: 'Choice added successfully', status: 200}
        }else {
            return {msg: 'Something went wrong!', status: 500}
        }
    }catch (err) {
        return {msg: err.message, status: 500}
    }
}

const editChoiceOfAttribute = async (choiceID, data) => {
    try {
        const choiceData = await Choice.findById(choiceID)
        if(choiceData) {
            const attrData = await Attribute.findById(choiceData.attribute).populate('choices')
            const availableChoices = attrData.choices.map(choice => choice.name);
            if(availableChoices.indexOf(data.name) !== -1) {
                return {msg: 'Choice name already exist', status: 409}
            }
            choiceData.name = data.name && data.name != '' ? data.name : choiceData.name
            choiceData.suffix = data.suffix && data.suffix != '' ? data.suffix : choiceData.suffix
            const updatedChoice = await choiceData.save()
            // await attrData.populate('choices')
            return {data: {...updatedChoice._doc}, success: 'Choice updated successfully', status: 200}
        }else {
            return {msg: 'Something went wrong!', status: 500}
        }
    }catch (err) {
        return {msg: err.message, status: 500}
    }
}

const deleteChoiceFromAttribute = async (choiceID) => {
    try {
        const deletedChoice = await Choice.findByIdAndDelete(choiceID)
        if(deletedChoice !== null) {
            await Attribute.updateOne({choices: choiceID}, {$pull: {choices: choiceID}})
            return {data: {...deletedChoice._doc}, success: 'Choice deleted successfully', status: 200}
        }else {
            return {msg: 'No choice found!', status: 404}
        }
    }catch (err) {
        return {msg: err.message, status: 500}
    }
}

module.exports = {
    addChoiceToAttribute,
    editChoiceOfAttribute,
    deleteChoiceFromAttribute
}