const jwt = require('jsonwebtoken');
const { getOne } = require('../../modules/role/roleService');

const verifyAuth = async (req, res, next) => {
    /*const token = req.header('auth-token')
    if(!token) return res.status(401).send('Access Denied')

    try{
        const verified = jwt.verify(token, process.env.JWT_SECRET)
        req.user = verified
        next()
    }catch(err) {
        res.status(400).send('Invalid Token')
    }*/

    const authorization = req.header('Authorization')
    if(!authorization) {
        return res.status(401).send('Access Denied')
    }

    try{
        const token = authorization.split(" ");
        if(token[0] != 'Bearer'){
            return res.status(401).send('Authorization Error')
        }
        const verified = jwt.verify(token[1], process.env.JWT_SECRET)
        req.user = verified
        let role
        if(verified.role) {
            role = await getOne(verified.role)
        }
        if(verified.superAdmin || role.data.systemAdmin) {
            next()
        }else {
            return res.status(401).send('Access Denied')
        }
    }catch(err) {
        res.status(400).send('Invalid Token')
    }
}

module.exports = verifyAuth
