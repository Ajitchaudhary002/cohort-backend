const express = require('express');
const authControllers = require('../controllers/auth.controller')
const identifyUser = require('../middlewares/auth.middleware')

const authRouter = express.Router();


authRouter.post('/register', authControllers.registerController)
authRouter.post('/login', authControllers.loginController)
authRouter.get('/get-me', identifyUser, authControllers.getMeController)

module.exports = authRouter