const followModel = require('../models/follow.model');
const userModel = require('../models/user.model');

async function followUserController(req, res) {
    const followerUsername = req.user.username;  // from identifyUser middleware
    const followeeUsername = req.params.username;

    // few checks... 

    if (followeeUsername == followerUsername) {
        return res.status(400).json({
            message: 'You cannot follow yourself.'
        })
    }

    const isFolloweeExists = await userModel.findOne({
        username: followeeUsername
    })

    if (!isFolloweeExists) {
        return res.status(404).json({
            message: "User you are trying to follow does not exist"
        })
    }

    const isAlreadyFollowing = await followModel.findOne({
        follower: followerUsername,
        followee: followeeUsername
    })

    if (isAlreadyFollowing) {
        return res.status(200).json({
            message: "You are already following this user",
            follow: isAlreadyFollowing
        })
    }

    const followRecord = await followModel.create({
        follower: followerUsername,
        followee: followeeUsername,

    })

    res.status(201).json({
        message: `You are now following ${followeeUsername}`,
        follow: followRecord
    })


}

async function unfollowUserController(req, res) {
    const followerUsername = req.user.username;
    const followeeUsername = req.params.username

    const isUserFollowing = await followModel.findOne({
        follower: followerUsername,
        followee: followeeUsername
    })

    if (!isUserFollowing) {
        return res.status(200).json({
            message: `You are not following ${followeeUsername}`,
        })
    }

    await followModel.findByIdAndDelete(isUserFollowing._id)

    res.status(200).json({
        message: `You have unfollowed ${followeeUsername}`
    })
}


async function followStatusController(req, res) {

    const followDocument = req.params.id

    const { status } = req.body;

    const updatedStatus = await followModel.findByIdAndUpdate(
        followDocument,
        { status },
        {
            new: true,   // return the updated document
            runValidators: true  // ensure the status is valid, enum validation is applied
        }
    );

    if(!updatedStatus){
        return res.status(404).json({
            message: "Follow request not found"
        });
    }

    res.status(200).json({
        message: "Status Updated",
        follow: updatedStatus
    });

}

module.exports = {
    followUserController,
    unfollowUserController,
    followStatusController
}