const userService = require('../services/user.service')

const listUser = async (req, res) => {
    const dataUser = await userService.getListUser()
    return res.status(200).json({
        message: "list User data",
        data: dataUser
    })
}

const createUser = async (req, res) => {
    try {
        const user = req.body
        const newUser = await userService.createUser(user)
        return res.status(201).json({ message: 'User create success !!!', data: newUser })
    } catch (error) {
        if (error.message === 'Email already exists' || error.code === 11000) {
            return res.status(400).json({
                message: 'Error',
                error: 'Email already exists'
            });
        }
        return res.status(400).json({
            message: 'Error',
            error: error.message
        });
    }
}

const userDetail = async (req, res) => {
    const { id } = req.params
    const dataDetail = await userService.detailUser(id)
    return res.status(201).json({ message: 'User detail!!!', data: dataDetail })
}


const deleteUser = async (req, res) => {
    const { id } = req.params
    await userService.deleteUser(id)
    return res.status(201).json({ message: 'User delete successful' })
}

const updateUser = async (req, res) => {
    const userUpdate = req.body
    const { id } = req.params
    const updateUserData = await userService.updateUser(id, userUpdate)

    return res.status(201).json({ message: 'Update user successful!!', data: updateUserData })

}

module.exports = {
    listUser, createUser, userDetail,
    deleteUser, updateUser
}