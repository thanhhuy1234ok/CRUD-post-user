const postModel = require('../models/post.model')

class PostService {
    async create(fromBlog) {
        const createBlog = await postModel.create({ ...fromBlog })
        return createBlog
    }
    async detailBlog(id) {
        return await postModel.findById({ _id: id })
    }
    async updateBlog(id, dataUpdate) {
        return await postModel.findByIdAndUpdate({ _id: id }, { ...dataUpdate })
    }
    async deleteBlog(id) {
        return await postModel.findOneAndDelete({ _id: id })
    }
    async getListPost() {
        return await postModel.find();
    }
    async searchBlog(name) {
        const r1 = new RegExp(`\\b${name}`, 'i');
        return await postModel.find({ title: { $regex: r1 } })
    }
}


module.exports = new PostService