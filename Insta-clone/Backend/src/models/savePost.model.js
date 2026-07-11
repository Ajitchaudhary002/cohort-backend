const mongoose = require('mongoose');

const savePostSchema = new mongoose.Schema({
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'posts',
        required: [true, 'post is required to save the post']
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: [true, 'user is required to save the post']
    }
}, {
    timestamps: true
})

savePostSchema.index({ post: 1, user: 1 }, { unique: true })

const savePostModel = mongoose.model('savePosts', savePostSchema);

module.exports = savePostModel

