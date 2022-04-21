// external import
const bcrypt = require('bcrypt')

// internal import 
const User = require("./User")

/**
 * Create new User
 * @param userData 
 * @returns Successful message or Error
 */
const add = async (userData) => {
    try {
        const result = await User.findOne({email: new RegExp(`^${userData.email}$`, 'i')})
        if(result !== null) {
            if(result.status === 'invited') {
                return {msg: `${result.email} user is already invited`, status: 200}
            }else {
                throw Error(`${result.email} user is already exist`)
            }
        }
        let newUser
        if(userData.password) {
            const encodedPassword = await bcrypt.hash(userData.password, 10)
            newUser = new User({
                ...userData,
                password: encodedPassword
            })
        }else {
            newUser = new User({
                ...userData
            })
        }
        const returnObject = await newUser.save()
        let createdUser = returnObject.toObject();
        delete createdUser.password
        return {data: {...createdUser}, success: 'User added successfully', status: 200}
    }catch(err) {
        return {msg: err.message, status: 500}
    }
}

/**
 * Edit/Update User
 * @param userID 
 * @param userData 
 * @returns Updated user data or error message
 */

const edit = async (userID, userData) => {

    try {
        const result = await User.findOne({email: new RegExp(`^${userData.email}$`, 'i')})
        let user
        if(result !== null) {
            if(result.id !== userID) {
                throw Error(`${result.email} user is already exist`)
            }
        }
        if(userData.password) {
            const encodedPassword = await bcrypt.hash(userData.password, 10)
            user = await User.findByIdAndUpdate(userID, {
                ...userData,
                password: encodedPassword
            }, {new: true}).populate('role').select(['-password'])
        }else {
            user = await User.findByIdAndUpdate(userID, {
                ...userData,
            }, {new: true}).populate('role').select(['-password'])
        }
        return {data: {...user._doc}, success: 'User updated successfully', status: 200}
    }catch (err) {
        return {msg: err.message, status: 500}
    }
}

/**
 * Get all Users
 * @returns All Users data
 */
const getList = async () => {
    try {
        const users = await User.find().sort({updatedAt: -1}).populate('role').select(['-password'])
        return {data: [...users], status: 200}
    }catch (err) {
        return {msg: err.message, status: 500}
    }
}

/**
 * Get all Users by user ID
 * @param userID 
 * @returns user data / Error message
 */
const getOne = async (userID) => {

    try {
        const user = await User.findById(userID).populate('role').select(['-password'])
        if(user !== null ){
            return {data: {...user._doc}, status: 200}
        }
        throw Error('User not found!')
    }catch (err) {
        return {msg: err.message, status: 500}
    }
}

/**
 * 
 * @param userID 
 * @returns Deleted user data or error message
*/
const deleteOne = async (userID) => {
    try {
        const deletedUser = await User.findByIdAndDelete(userID).select(['-password'])
        if(deletedUser !== null ){
            return {data: {...deletedUser._doc}, success: `${deletedUser.name} User deleted successfully`, status: 200}
        }
        throw Error('User not found!')
    }catch (err){
        return {msg: err.message, status: 500}
    }
}

/**
 *
 * @returns Successful message or Error
 */

const createSuperUser = async () => {
    try {
        const superUser = await User.find({email: 'omicronit.work@gmail.com'})
        if(superUser.length) {
            return {msg: 'Super user already exist', status: 409}
        } else {
            let newUser
            const encodedPassword = await bcrypt.hash('admin!@', 10)
            newUser = new User({
                firstName: 'Omicron',
                lastName: 'IT',
                email: 'omicronit.work@gmail.com',
                password: encodedPassword,
                superAdmin: true
            })
            result = await newUser.save()
            return {success: 'Super User added successfully', status: 200}
        }
    } catch(err) {
        return {msg: err.message, status: 500}
    }
}

/**
 * 
 * @param {*} userID 
 * @param {*} userData 
 * @returns 
 */

const updateUserProfile = async (userID, userData) => {
    try {
        const result = await User.findById(userID)
        let user
        if(result !== null) {
            if(result.id !== userID) {
                throw Error(`${result.email} is already exist`)
            }
        }

        if(userData.newPassword && userData.confirmPassword) {
            const encodedPassword = await bcrypt.hash(userData.newPassword, 10)
            user = await User.findByIdAndUpdate(userID, {
                    ...userData,
                    password: encodedPassword
            }, {new: true}).select(['-password', '-role'])
        }else {
            user = await User.findByIdAndUpdate(userID, {
                ...userData,
            }, {new: true}).select(['-password', '-role'])
        }

        /*
        if(userData.current_password) {
            isValid = await bcrypt.compare(userData.current_password, result.password)
            if(isValid && userData.new_password != ''){
                const encodedPassword = await bcrypt.hash(userData.new_password, 10)
                user = await User.findByIdAndUpdate(userID, {
                    ...userData,
                    password: encodedPassword
                }, {new: true}).select(['-password', '-role'])
            }else {
                return {msg: 'Current password is incorrect', status: 401}
            }
        }else {
            user = await User.findByIdAndUpdate(userID, {
                ...userData,
            }, {new: true}).select(['-password', '-role'])
        }

        */

        return {data: user, success: 'User profile updated successfully', status: 200}
    }catch (err) {
        return {msg: err.message, status: 500}
    }
}

/**
 * 
 * @param {*} user Mongoose Object
 * @param {*} token Mongoose Object
 * @param {*} data 
 * @returns success or error message
 */
const resetUserPassword = async (user, token, data) => {
    if(data.newPassword && data.confirmPassword && data.newPassword == data.confirmPassword) {
        try{
            user.password = await bcrypt.hash(data.newPassword, 10);
            await user.save();
            await token.delete();
            return {msg: 'password reset sucessfully.', status: 200}
        }catch(err) {
            return {msg: err.message, status: 500}
        }
    }else {
        return {msg: 'An error occured.', status: 500}
    }
}

/**
 * 
 * @param {*} user 
 * @param {*} token 
 * @param {*} data 
 * @returns success or error message
 */
const updateInvitedUser = async (user, token, data) => {
    if(data.newPassword && data.confirmPassword && data.newPassword == data.confirmPassword) {
        try{
            user.password = await bcrypt.hash(data.newPassword, 10);
            user.firstName = data.firstName != '' ? data.firstName : user.firstName;
            user.lastName = data.lastName != '' ? data.lastName : user.lastName;
            user.status = 'active';
            await user.save();
            await token.delete();
            return {msg: 'Invited user added sucessfully.', status: 200}
        }catch(err) {
            return {msg: err.message, status: 500}
        }
    }else {
        return {msg: 'An error occured.', status: 500}
    }
}

const userRoleBulkUpdateOnRoleDel = async (docs) => {
    
    try {
        const result = await User.bulkWrite(docs.map(doc => ({
            updateOne: {
                filter: {_id: doc.id},
                update: {role: doc.role},
            }
        })))
        return {msg: 'User role has been updated', status: 200}
    }catch (err) {
        return {msg: 'Something went wrong', status: 500}
    }
}

module.exports = {
    add,
    edit,
    getList,
    getOne,
    deleteOne,
    createSuperUser,
    updateUserProfile,
    resetUserPassword,
    updateInvitedUser,
    userRoleBulkUpdateOnRoleDel
}