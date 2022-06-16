const { addPriceList, getAllPriceList, getPriceList, editPriceList, deletePriceList } = require("./service")

const createPriceList = async (req, res, next) => {
    const response = await addPriceList(req.body)
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

const allPriceList = async (req, res, next) => {
    const response = await getAllPriceList()
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

const priceListById = async (req, res, next) => {
    const response = await getPriceList(req.params.id)
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

const updatePriceList = async (req, res, next) => {
    const response = await editPriceList(req.params.id, req.body)
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

const removePriceList = async (req, res, next) => {
    const response = await deletePriceList(req.params.id)
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
    createPriceList,
    allPriceList,
    priceListById,
    updatePriceList,
    removePriceList
}