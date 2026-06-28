const express = require('express');
const postRouter = express.Router();
const postControllers = require('../controllers/post.controllers')
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() })

postRouter.post('/', upload.single('image'), postControllers.createPostController)

postRouter.get('/', postControllers.getPostController)

postRouter.get('/details/:postId', postControllers.getPostDetailsController)

module.exports = postRouter