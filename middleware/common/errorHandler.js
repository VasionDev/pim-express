// external import
const createHttpError = require("http-errors")

// not found handler
const notFoundHandler = (req, res, next) => {
    next(createHttpError(404, 'Requested content was not found!'))
}

// default error handler
const errorHandler = (err, req, res, next) => {
    const errors = process.env.NODE_ENV === 'development' ? err : {message: err.message}
    res.status(err.status || 500)
    res.json(errors)
}

module.exports = {
    notFoundHandler,
    errorHandler
}