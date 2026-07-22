import { Router } from "express";
import { authUser } from "../middleware/auth.middleware.js";
import { registerUser, loginUser, getMe, verifyEmail } from "../controllers/auth.controller.js";
import { registerValidator, loginValidator } from '../validators/auth.validator.js'

const authRouter = Router()

authRouter.post('/register', registerValidator, registerUser)
authRouter.get('/verify-email', verifyEmail)
authRouter.post('/login', loginValidator, loginUser)
authRouter.get('/get-me', authUser, getMe)

export default authRouter;