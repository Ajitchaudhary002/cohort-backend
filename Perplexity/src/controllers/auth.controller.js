import userModel from '../models/user.model.js'
import { sendEmail } from '../services/mail.service.js';

export async function registerUser(req, res) {
    const { username, email, password } = req.body;

    const isUserAlreadyExists = await userModel.findOne({
        $or: [{ email }, { username }]
    })

    if (isUserAlreadyExists) {
        return res.status(400).json({
            message: 'User with this email or username already exists',
            success: false,
            err: 'User already exists'
        })
    }

    const user = await userModel.create({
        username, email, password
    })

    await sendEmail({
        to: email,
        subject: 'Welcome to Perplexity!',
        html: `
            <p>Hi ${username},</p>
            <p>Thank you for registering at Perplexity. we are excited to have you</p>
            <p>Best regards, <br> The perplexity Team</p>
        `
    })

    res.status(201).json({
        message: 'User registered successfully',
        success: true,
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    })
}
