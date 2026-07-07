const postModel = require('../models/post.model');
const likeModel = require('../models/like.model')
const savePostModel = require('../models/savePost.model')

const ImageKit = require('@imagekit/nodejs');
const { toFile } = require('@imagekit/nodejs');
const jwt = require('jsonwebtoken');

const imagekit = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY
})


async function createPostController(req, res) {

    const file = await imagekit.files.upload({
        file: await toFile(Buffer.from(req.file.buffer), 'file'),
        fileName: 'test',
        folder: "cohort-insta-clone-posts"
    })

    const post = await postModel.create({
        caption: req.body.caption,
        imgUrl: file.url,
        user: req.user.id
    })

    res.status(201).json({
        message: "Post created successfully",
        post
    })
}

async function getPostController(req, res) {

    const userId = req.user.id

    const posts = await postModel.find({
        user: userId
    })

    res.status(200).json({
        message: 'Posts fetched successfully.',
        posts
    })

}

async function getPostDetailsController(req, res) {

    const userId = req.user.id
    const postId = req.params.postId

    const post = await postModel.findById(postId)

    if (!post) {
        return res.status(404).json({
            message: "Post not found."
        })
    }

    const isValidUser = post.user.toString() === userId  // ObjectId == ObjectId not possible, so --> .toString()

    if (!isValidUser) {
        return res.status(403).json({
            message: "Forbidden Content."
        })
    }

    return res.status(200).json({
        message: "Post fetched successfully.",
        post
    })

}

async function likePostController(req, res) {
    const username = req.user.username;
    const postId = req.params.postId

    const post = await postModel.findById(postId)

    if (!post) {
        return res.status(404).json({
            message: 'Post not found'
        })
    }

    const isPostAlreadyLiked = await likeModel.findOne({
        post: postId,
        user: username
    })

    if (isPostAlreadyLiked) {
        return res.status(200).json({
            message: "Post already liked"
        })
    }

    const like = await likeModel.create({
        post: postId,
        user: username
    })

    res.status(201).json({
        message: "Post liked successfully",
        like
    })
}

async function unLikePostController(req, res) {
    const username = req.user.username;
    const postId = req.params.postId

    const isLiked = await likeModel.findOne({
        post: postId,
        user: username
    })

    if (!isLiked) {
        return res.status(400).json({
            message: "Post not liked yet"
        })
    }

    await likeModel.findByIdAndDelete(isLiked._id)

    res.status(200).json({
        message: "post un liked successfully"
    })
}

async function getFeedController(req, res) {

    // populate the user field in the post model to get the user details along with the post details
    // select false for the password field in the user model to exclude it from the response
    // .select("+password") in login controller

    const user = req.user

    const posts = await Promise.all((await postModel.find().populate("user").lean())
        .map(async (post) => {
            const isLiked = await likeModel.findOne({
                user: user.username,
                post: post._id

            })

            const isSaved = await savePostModel.findOne({
                post: post._id,
                user: user.username,
            })

            post.isLiked = Boolean(isLiked)
            post.isSaved = Boolean(isSaved)

            return post
        }))

    res.status(200).json({
        message: 'posts fetched successfully',
        posts
    })
}

async function savePostController(req, res) {
    const username = req.user.username
    const postId = req.params.postId

    const post = await postModel.findById(postId)

    if (!post) {
        return res.status(404).json({
            message: 'post not found'
        })
    }

    const isPostAlreadySaved = await savePostModel.findOne({
        post: postId,
        user: username
    })

    if (isPostAlreadySaved) {
        return res.status(200).json({
            message: 'post already saved'
        })
    }

    const save = await savePostModel.create({
        post: postId,
        user: username
    })

    res.status(201).json({
        message: 'Post saved successfully',
        save
    })
}

async function unSavePostController(req, res) {
    postId = req.params.postId
    username = req.user.username

    const post = await postModel.findById(postId)

    if (!post) {
        return res.status(404).json({
            message: 'post not found'
        })
    }

    const isSaved = await savePostModel.findOne({
        post: postId,
        user: username
    })

    if (!isSaved) {
        return res.status(200).json({
            message: 'post is not saved yet'
        })
    }

    await savePostModel.findByIdAndDelete(isSaved._id);

    res.status(201).json({
        message: 'post unsaved successfully'
    })
}

module.exports = {
    createPostController,
    getPostController,
    getPostDetailsController,
    likePostController,
    unLikePostController,
    getFeedController,
    savePostController,
    unSavePostController

}  