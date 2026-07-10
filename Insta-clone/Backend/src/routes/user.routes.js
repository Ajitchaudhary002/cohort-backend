const express = require('express');
const userRouter = express.Router();

const identifyUser = require('../middlewares/auth.middleware');
const userControllers = require('../controllers/user.controller');

// /api/users/follow/:userid


userRouter.post('/follow/:userid', identifyUser,userControllers.followUserController)
userRouter.post('/unfollow/:userid', identifyUser, userControllers.unfollowUserController)
userRouter.patch('/follow/:id', userControllers.followStatusController)

userRouter.get('/followers', identifyUser, userControllers.getFollowersController)
userRouter.get('/following', identifyUser, userControllers.getFollowingController)
userRouter.get('/follow-requests', identifyUser, userControllers.getFollowRequestsController)


module.exports = userRouter;