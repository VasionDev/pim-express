const jwt = require('jsonwebtoken')

const verifyUserAuth = (req, res, next) => {

    const authorization = req.header('Authorization')

    if(!authorization) {
        return res.status(401).send('Access Denied')
    }

    try{
        const token = authorization.split(" ");
        if(token[0] != 'Bearer'){
            return res.status(401).send('Authorization Error')
        }
        const decoded = jwt.verify(token[1], process.env.JWT_SECRET)
        req.user = decoded
        if(decoded.userId != '') {
            next()
        }else {
            return res.status(401).send('Access Denied')
        }
    }catch(err) {
        res.status(400).send('Invalid Token')
    }
}

module.exports = verifyUserAuth
