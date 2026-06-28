const express = require('express');
const postRouter = express.Router();
const postControllers = require('../controllers/post.controllers')
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() })
const identifyUser = require('../middlewares/post.middleware')


postRouter.post('/', upload.single('image'), identifyUser, postControllers.createPostController)

postRouter.get('/', identifyUser, postControllers.getPostController)

postRouter.get('/details/:postId', identifyUser, postControllers.getPostDetailsController)

module.exports = postRouter