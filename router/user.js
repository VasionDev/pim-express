// external import
const express = require('express')
const verifyAuth = require('../middleware/common/verifyAuth')
const { userFormValidator, userValidationHandler } = require('../middleware/user/userFormValidator')
const verifyUserAuth = require('../middleware/user/verifyUserAuth')
const { getUsers, createUser, userById, updateUser, deleteUser, addSuperUser, manageUserProfile, userRoleBulkUpdate } = require('../modules/user/userController')

const userRouter = express.Router()

userRouter.get('/', verifyAuth, getUsers)
userRouter.post('/add', verifyAuth, userFormValidator, userValidationHandler, createUser)
userRouter.get('/get/:id', verifyAuth, userById)
userRouter.patch('/profile/manage', verifyUserAuth, manageUserProfile)
userRouter.put('/edit/:id', verifyAuth, updateUser)
userRouter.delete('/delete/:id', verifyAuth, deleteUser)
userRouter.post('/add-super-user', addSuperUser)

userRouter.post('/role/bulk/update', verifyAuth, userRoleBulkUpdate)

module.exports = userRouter