const express = require('express')
const router = express.Router()
const postController = require('../../controllers/post.controller')

router.get('/list-post', postController.listContent)
router.post(`/create-post`, postController.postContent)
router.get(`/detail-post/:id`, postController.blogDetail)
router.patch(`/update-post/:id`, postController.updateBlog)
router.delete(`/delete-post/:id`, postController.deleteBlog)

router.get(`/search-blog`, postController.findBlogByTitle)
module.exports = router