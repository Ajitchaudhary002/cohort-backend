
const userModel = require('../models/user.model');
const followModel = require('../models/follow.model');
const postModel = require('../models/post.model')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


async function buildUserPayload(user) {
    const { followersCount, followingCount, postCount } = await getFollowCounts(user._id);

    return {
        id: user._id,
        username: user.username,
        email: user.email,
        bio: user.bio,
        profileImage: user.profileImage,
        followersCount,
        followingCount,
        postCount
    };
}

async function getFollowCounts(userId) {
    const [followersCount, followingCount, postCount] = await Promise.all([
        followModel.countDocuments({ followee: userId, status: 'accepted' }),
        followModel.countDocuments({ follower: userId, status: 'accepted' }),
        postModel.countDocuments({ user: userId })
    ]);

    return { followersCount, followingCount, postCount };
}


async function registerController(req, res) {
    const { email, username, password, bio, profileImage } = req.body;

    const isUserAlreadyExists = await userModel.findOne({
        $or: [
            { username },
            { email }
        ]
    })

    if (isUserAlreadyExists) {
        return res.status(409)
            .json({
                message: "User already exists " + (isUserAlreadyExists.email == email ? "with same email" : " with same Username")
            })
    }

    const hash = await bcrypt.hash(password, 10)

    const user = await userModel.create({
        username,
        email,
        bio,
        profileImage,
        password: hash,

    })

    const token = jwt.sign(
        {
            id: user._id,
            username: user.username
        },
        process.env.JWT_SECRET,
        { expiresIn: "2d" }
    )

    res.cookie('token', token)

    const userPayload = await buildUserPayload(user);

    res.status(201).json({
        message: "User Registered successfully",
        user: userPayload
    })

}

async function loginController(req, res) {
    const { username, email, password } = req.body;

    const user = await userModel.findOne({
        $or: [
            {
                username: username,
            },
            {
                email: email
            }
        ]
    }).select('+password')

    if (!user) {
        return res.status(404).json({
            message: "User Not Found"
        })
    }


    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        return res.status(401).json({
            message: "Invalid Password"
        })
    }

    const token = jwt.sign(
        {
            id: user._id,
            username: user.username
        },
        process.env.JWT_SECRET,
        { expiresIn: "2d" }
    )

    res.cookie("token", token)

    const userPayload = await buildUserPayload(user);

    res.status(200)
        .json({
            message: "User Login Successfully",
            user: userPayload
        })

}

async function getMeController(req, res) {
    const userId = req.user.id

    const user = await userModel.findById(userId)
    const userPayload = await buildUserPayload(user);

    res.status(200).json({
        user: userPayload
    })
}

module.exports = {
    registerController,
    loginController,
    getMeController
}