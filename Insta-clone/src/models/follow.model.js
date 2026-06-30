const mongoose = require('mongoose');

const followSchema = new mongoose.Schema({
    follower: String,

    followee: String,
}, {
    timestamps: true
})

followSchema.index({ follower: 1, following: 1 }, { unique: true }) // to avoid duplicate followings

const followModel = mongoose.model("follows", followSchema);

module.exports = followModel;