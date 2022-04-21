// internal import 
const Team = require("./Team")
const User = require("../user/User")

/**
 * Create new Team
 * @param teamData 
 * @returns Successful message or Error
 */
const add = async (teamData, query) => {
    try {
        let newTeam
        newTeam = new Team({
            ...teamData
        })
        const createdTeam = await newTeam.save()
        if(query.user_detail && query.user_detail == 'true') {
            await createdTeam.populate({path: 'users', select: '-password'})
        }
        return {data: {...createdTeam._doc}, success: 'Team added successfully', status: 200}
    }catch(err) {
        return {msg: err.message, status: 500}
    }
}

/**
 * Edit/Update Team
 * @param teamID 
 * @param teamData 
 * @returns Updated team data or error message
 */

const edit = async (teamID, teamData, query) => {
   
    try {
        const result = await Team.findOne({name: new RegExp(`^${teamData.name}$`, 'i')})
        if(result !== null) {
            if(result.id !== teamID) {
                throw Error(`${result.name} team is already exist`)
            }
        }

        const team = await Team.findByIdAndUpdate(teamID, {
            ...teamData
        }, {new: true})

        if(query.user_detail && query.user_detail == 'true') {
           await team.populate({path: 'users', select: '-password'}) 
        }
        return {data: {...team._doc}, success: 'Team updated successfully', status: 200}
    }catch (err) {
        return {msg: err.message, status: 500}
    }
}

/**
 * Get all Teams
 * @returns All Teams data
 */
const getList = async (query) => {
    try {
        let teams
        if(query.user_detail && query.user_detail == 'true') {
            teams = await Team.find().sort({updatedAt: -1}).populate({path: 'users', select: '-password'})
        }else {
            teams = await Team.find().sort({updatedAt: -1})
        }
        return {data: [...teams], status: 200}
    }catch (err) {
        return {msg: err.message, status: 500}
    }
}

/**
 * Get all Teams by team ID
 * @param teamID 
 * @returns team data / Error message
 */
const getOne = async (teamID, query) => {

    try {
        const team = await Team.findById(teamID)
        if(team !== null ){
            if(query.user_detail && query.user_detail == 'true') {
                await team.populate('users', '-password')
            }
            return {data: {...team._doc}, status: 200}
        }
        throw Error('Team not found!')
    }catch (err) {
        return {msg: err.message, status: 500}
    }
}

/**
 * 
 * @param teamID 
 * @returns Deleted team data or error message
*/
const deleteOne = async (teamID) => {
    try {
        const deletedTeam = await Team.findByIdAndDelete(teamID)
        if(deletedTeam !== null ){
            await User.updateMany({teams: teamID}, {$pull: {teams: teamID}})
            return {data: {...deletedTeam._doc}, success: `${deletedTeam.name} Team deleted successfully`, status: 200}
        }
        throw Error('Team not found!')
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