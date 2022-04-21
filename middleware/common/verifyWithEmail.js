const User = require("../../modules/user/User");

const verifyResetpass = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            res.json({msg: "user with given email doesn't exist", status: 400});
        }else {
            next()
        }
    }catch(err) {
        res.json({msg: 'An error occured', status: 500});
    }
}

const verifyInvitation = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if(user) {
            if(user.status == 'invited') {
                next()
            }else {
                res.json({msg: "An active user with given email already exist", status: 400});
            }
        }else {
            next()
            // res.json({msg: "invited user with given email doesn't exist", status: 400});
        }
    }catch(err) {
        res.json({msg: 'An error occured', status: 500});
    }
}

module.exports = {
    verifyResetpass,
    verifyInvitation
}