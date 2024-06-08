const express = require('express')
const router = express.Router()
const userController = require('../../controllers/user.controller')

router.get('/list-user', userController.listUser)

router.post('/create-user', userController.createUser)
router.get('/get-user-detail/:id', userController.userDetail)
router.patch('/update-user/:id', userController.updateUser)
router.delete('/delete-user/:id', userController.deleteUser)

module.exports = router