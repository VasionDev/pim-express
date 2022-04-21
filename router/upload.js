// external import
const express = require('express')
const uploadImage = require('../middleware/common/uploadImage')
const { uploadToCloud } = require('../common/services/uploadService')

const uploadRouter = express.Router()

uploadRouter.post('/image-upload', uploadImage(), uploadToCloud)

module.exports = uploadRouter