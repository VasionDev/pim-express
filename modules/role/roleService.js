// internal import 
const Role = require("./Role")

/**
 * Create new Role
 * @param roleData 
 * @returns Successful message or Error
 */
const add = async (roleData) => {
    try {
        let newRole
        newRole = new Role({
            ...roleData
        })
        const createdRole = await newRole.save()
        return {data: {...createdRole._doc}, success: 'Role added successfully', status: 200}
    }catch(err) {
        return {msg: err.message, status: 500}
    }
}

/**
 * Edit/Update Role
 * @param roleID 
 * @param roleData 
 * @returns Updated role data or error message
 */

const edit = async (roleID, roleData) => {

    try {
        const result = await Role.findOne({name: new RegExp(`^${roleData.name}$`, 'i')})
        if(result !== null) {
            if(result.id !== roleID) {
                throw Error(`${result.name} role is already exist`)
            }
        }
        const role = await Role.findByIdAndUpdate(roleID, {
            ...roleData,
        }, {new: true})
        return {data: {...role._doc}, success: 'Role updated successfully', status: 200}
    }catch (err) {
        return {msg: err.message, status: 500}
    }
}

/**
 * Get all Roles
 * @returns All Roles data
 */
const getList = async () => {
    try {
        const roles = await Role.find()
        return {data: [...roles], status: 200}
    }catch (err) {
        return {msg: err.message, status: 500}
    }
}

/**
 * Get all Roles by role ID
 * @param roleID 
 * @returns Role data / Error message
 */
const getOne = async (roleID) => {

    try {
        const role = await Role.findById(roleID)
        if(role !== null ){
            return {data: {...role._doc}, status: 200}
        }
        throw Error('Role not found!')
    }catch (err) {
        return {msg: err.message, status: 500}
    }
}

/**
 * 
 * @param roleID 
 * @returns Deleted role data or error message
*/
const deleteOne = async (roleID) => {
    try {
        const deletedRole = await Role.findByIdAndDelete(roleID)
        if(deletedRole !== null ){
            return {data: {...deletedRole._doc}, success: `${deletedRole.name} Role deleted successfully`, status: 200}
        }
        throw Error('Role not found!')
    }catch (err){
        return {msg: err.message, status: 500}
    }
}

module.exports = {
    add,
    edit,
    getList,
    getOne,
    deleteOne,
}