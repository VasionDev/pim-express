// internal import
const uploader = require("../../utilities/singleUploader")

// image uploader middleware
const uploadImage = () => {
    return (req, res, next) => {
        const upload = uploader(
            ['image/png', 'image/jpeg', 'image/jpg'],
            100000,
            'Image file must be .png/.jpeg/.jpg'
        )
    
        upload.any()(req, res, (err) => {
            if(err) {
                res.status(500).json({
                    errors: {
                        msg: err.message
                    }
                })
            }else {
                if(req.files.length === 0) {
                    res.status(500).json({
                        errors: {
                            msg: 'Image file must not be empty'
                        }
                    })
                }else {
                    next()
                }
            }
        })
    }
}

module.exports = uploadImage
