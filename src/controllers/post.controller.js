const postModel = require('../models/post.model')

const postContent = async (req, res) => {
    const { title, content, userId } = req.body

    const createBlog = await postModel.create({ title, content, userId })

    return res.status(200).json({ message: "tao thanh cong", data: createBlog })
}

const blogDetail = (req, res) => {
    const { id } = req.params
    postModel.findById({ _id: id })
        .then((blog) => {
            res.send(blog)
        })
        .catch((err) => {
            res.status(500).send(err)
        })
}

const updateBlog = (req, res) => {
    const { id } = req.params
    const dataUpdate = req.body
    postModel.findByIdAndUpdate({ _id: id }, { ...dataUpdate })
        .then((blog) => {
            res.send(blog)
        })
        .catch((err) => {
            res.status(500).send(err)
        })
}

const deleteBlog = (req, res) => {
    const { id } = req.params
    postModel.findOneAndDelete({ _id: id })
        .then(() => {
            res.send('delete success !!!!')
        })
        .catch((err) => {
            res.status(500).send(err)
        })
}

const findBlogByTitle = (req, res) => {
    const { name } = req.query
    const r1 = new RegExp(`\\b${name}`, 'i');
    postModel.find({ title: { $regex: r1 } })
        .then((blog) => {
            res.send(blog)
        })
        .catch((err) => {
            res.status(500).send(err)
        })
}

const listContent = async (req, res) => {
    const dataPost = await postModel.find();
    return res.status(200).json({
        message: "list Post data",
        data: dataPost
    })
}

module.exports = {
    postContent, blogDetail, updateBlog, deleteBlog, findBlogByTitle, listContent
}