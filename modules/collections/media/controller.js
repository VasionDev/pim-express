const { addMediaCategory, addMedia, getCategoryList, getMediaList, getMedia, getCategory, editMediaCategory, editMedia, deleteMediaCat, deleteMediaById } = require("./service")

const createMediaCategory = async (req, res, next) => {
    const response = await addMediaCategory(req.body)
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

const createMedia = async (req, res, next) => {
    const response = await addMedia(req.params.id, req.body)
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

const getMediaCategories = async (req, res, next) => {
    const response = await getCategoryList()
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

const getMedias = async (req, res, next) => {
    const response = await getMediaList()
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

const mediaCatById = async (req, res, next) => {
    const response = await getCategory(req.params.id)
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

const mediaById = async (req, res, next) => {
    const response = await getMedia(req.params.id)
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

const updateMediaCategory = async (req, res, next) => {
    const response = await editMediaCategory(req.params.id, req.body)
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

const updateMedia = async (req, res, next) => {
    const response = await editMedia(req.params.id, req.body)
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

const deleteMediaCategory = async (req, res, next) => {
    const response = await deleteMediaCat(req.params.id)
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

const deleteMedia = async (req, res, next) => {
    const response = await deleteMediaById(req.params.id)
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
    createMediaCategory,
    createMedia,
    getMediaCategories,
    getMedias,
    mediaCatById,
    mediaById,
    updateMediaCategory,
    updateMedia,
    deleteMediaCategory,
    deleteMedia
}