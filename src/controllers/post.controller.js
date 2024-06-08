const postService = require('../services/post.service')
const postContent = async (req, res) => {
    const fromBlog = req.body
    const createBlog = await postService.create(fromBlog)
    return res.status(200).json({ message: "tao thanh cong", data: createBlog })
}

const blogDetail = async (req, res) => {
    const { id } = req.params
    const dataDetailBlog = await postService.detailBlog(id);
    return res.status(201).json({ message: 'detail post', data: dataDetailBlog })
}

const updateBlog = async (req, res) => {
    const { id } = req.params
    const dataUpdate = req.body
    await postService.updateBlog(id, dataUpdate)
    return res.status(201).json({ message: 'Update post susseccful', })
}

const deleteBlog = async (req, res) => {
    const { id } = req.params
    const postDelete = await postService.deleteBlog(id)
    return res.status(201).json({ message: 'Delete post susseccful', data: postDelete })
}

const findBlogByTitle = async (req, res) => {
    const { name } = req.query
    const reSearchPost = await postService.searchBlog(name)
    return res.status(201).json({ message: 're Search data susseccful', data: reSearchPost })
}

const listContent = async (req, res) => {
    const dataPost = await postService.getListPost()
    return res.status(200).json({
        message: "list Post data",
        data: dataPost
    })
}

module.exports = {
    postContent, blogDetail, updateBlog, deleteBlog, findBlogByTitle, listContent
}