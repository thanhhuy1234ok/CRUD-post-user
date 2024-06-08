const postModel = require('../models/post.model')
const userModel = require('../models/user.model')
class PostService {
    async create(fromBlog) {
        // Tạo bài viết mới
        const createBlog = await postModel.create({ ...fromBlog });
        const populatedBlog = await createBlog.populate([{ path: 'user', strictPopulate: false }]);

        await userModel.findByIdAndUpdate(populatedBlog.userId._id, {
            $push: { posts: createBlog._id }
        });

        return populatedBlog;
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
    async deletePostsByUserId(userId) {
        try {
            const deletedPosts = await postModel.deleteMany({ userId: userId });
            return deletedPosts;
        } catch (error) {
            throw error;
        }
    }
}


module.exports = new PostService