const { addSellingChannel, getSellingChannelList, getSellingChannel, editSellingChannel, deleteSellingChannel } = require("./service")

const createSellingChannel = async (req, res, next) => {
    const response = await addSellingChannel(req.body)
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

const getAllSellingChannel = async (req, res, next) => {
    const response = await getSellingChannelList()
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

const sellingChannelById = async (req, res, next) => {
    const response = await getSellingChannel(req.params.id)
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

const updateSellingChannel = async (req, res, next) => {
    const response = await editSellingChannel(req.params.id, req.body)
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

const removeSellingChannel = async (req, res, next) => {
    const response = await deleteSellingChannel(req.params.id)
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
    createSellingChannel,
    getAllSellingChannel,
    sellingChannelById,
    updateSellingChannel,
    removeSellingChannel
}