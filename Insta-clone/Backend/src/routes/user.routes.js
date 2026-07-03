const express = require('express');
const userRouter = express.Router();

const identifyUser = require('../middlewares/auth.middleware');
const userControllers = require('../controllers/user.controller');

// /api/users/follow/:username

userRouter.post('/follow/:username', identifyUser,userControllers.followUserController)
userRouter.post('/unfollow/:username', identifyUser, userControllers.unfollowUserController)
userRouter.patch('/follow/:id', userControllers.followStatusController)

module.exports = userRouter;