const userModel = require('../models/user.model')

class UserService {
    async createUser(user) {
        const newUser = new userModel(user)
        return newUser.save()
    }

    async detailUser(id) {
        return await userModel.findById(id)
    }

    async getListUser() {
        const dataUser = await userModel.find();
        return dataUser
    }

    async deleteUser(id) {
        return await userModel.findByIdAndDelete(id)
    }

    async updateUser(id, userUpdate) {
        return await userModel.findOneAndUpdate({ _id: id }, { ...userUpdate }, { new: true })

    }

    async findEmail(email) {
        await userModel.find({ email: email })
        return 0
    }
}



module.exports = new UserService