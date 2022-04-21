const formatBufferTo64 = require('../../utilities/formatBuffer')
const cloudinaryUpload = require('../../utilities/cloudinaryUpload')

const uploadToCloud = async (req, res, next) => {
    try {
        let uploadTo = 'default'
        if(req.query.uploadTo && req.query.uploadTo!= '') {
            uploadTo = req.query.uploadTo
        }
        const file64 = formatBufferTo64(req.files[0])
        const uploadResult = await cloudinaryUpload(file64.content, `pim/${uploadTo}`)
        return res.status(200).json(uploadResult)
    }catch (err) {
        return {msg: err.message, status: err.status}
    }
}

module.exports = {
    uploadToCloud
}