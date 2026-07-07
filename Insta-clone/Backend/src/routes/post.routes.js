const express = require('express');
const postRouter = express.Router();

const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() })

const postControllers = require('../controllers/post.controller')

const identifyUser = require('../middlewares/auth.middleware')

// default route /api/posts/

postRouter.post('/', upload.single('image'), identifyUser, postControllers.createPostController)

postRouter.get('/', identifyUser, postControllers.getPostController)

postRouter.get('/details/:postId', identifyUser, postControllers.getPostDetailsController)

postRouter.post('/like/:postId', identifyUser, postControllers.likePostController)
postRouter.post('/unlike/:postId', identifyUser, postControllers.unLikePostController)
postRouter.get('/feed', identifyUser, postControllers.getFeedController)

module.exports = postRouter
