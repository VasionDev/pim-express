const { addChoiceToAttribute, editChoiceOfAttribute, deleteChoiceFromAttribute } = require("./service")


const addChoice = async (req, res, next) => {
    const attributeId = req.params.id
    const response = await addChoiceToAttribute(attributeId, req.body)
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

const editChoice = async (req, res, next) => {
    const choiceId = req.params.id
    const response = await editChoiceOfAttribute(choiceId, req.body)
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

const deleteChoice = async (req, res, next) => {
    const choiceId = req.params.id
    const response = await deleteChoiceFromAttribute(choiceId)
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
    addChoice,
    editChoice,
    deleteChoice
}