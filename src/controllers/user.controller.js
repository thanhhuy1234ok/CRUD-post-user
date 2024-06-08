const userModel = require('../models/user.model')

const listUser = async (req, res) => {
    const dataUser = await userModel.find();
    return res.status(200).json({
        message: "list User data",
        data: dataUser
    })
}

const createUser = (req, res) => {
    const { name, email } = req.body

    const user = new userModel({
        name,
        email
    })

    user.save().then(() => {
        res.send('User Created')
    }).catch((err) => {
        res.status(500).send(err)
    })
}

const userDetail = (req, res) => {
    const { id } = req.params

    userModel.findById(id)
        .then((user) => {
            res.send(user)
        })
        .catch((err) => {
            res.status(500).send(err)
        })
}


const deleteUser = (req, res) => {
    const { id } = req.params
    userModel.findByIdAndDelete(id)
        .then((user) => {
            res.send(user)
        }).catch((err) => {
            res.status(500).send(err)
        })
}

const updateUser = (req, res) => {
    const { name, email } = req.body
    const { id } = req.params
    userModel.findOneAndUpdate({ _id: id }, { name, email }, { new: true })
        .then((user) => {
            res.send(user);
        }).catch((err) => {
            res.status(500).send(err);
        });
}

module.exports = {
    listUser, createUser, userDetail,
    deleteUser, updateUser
}