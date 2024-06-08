const userService = require('../services/user.service')
var validateEmail = function (email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

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
        if (!validateEmail(user.email)) {
            return res.json({ message: "Email is valid." });
        }

        const newUser = await userService.createUser(user)
        return res.status(201).json({ message: 'User create success !!!', data: newUser })
    } catch (error) {
        return res.status(400).json({
            message: "loi",
            error: error
        })
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