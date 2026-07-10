const followModel = require('../models/follow.model');
const userModel = require('../models/user.model');

async function followUserController(req, res) {
    const follower = req.user.id;  // from identifyUser middleware
    console.log(req.user.id)
    const followee = req.params.userid;
    console.log(req.params.userid)

    // few checks... 

    if (followee == follower) {
        return res.status(400).json({
            message: 'You cannot follow yourself.'
        })
    }

    const isFolloweeExists = await userModel.findOne({
        _id: followee
    })

    if (!isFolloweeExists) {
        return res.status(404).json({
            message: "User you are trying to follow does not exist"
        })
    }

    const isAlreadyFollowing = await followModel.findOne({
        follower: follower,
        followee: followee
    })

    if (isAlreadyFollowing) {
        return res.status(200).json({
            message: "You are already following this user",
            follow: isAlreadyFollowing
        })
    }

    const followRecord = await followModel.create({
        follower: follower,
        followee: followee,

    })

    res.status(201).json({
        message: `You are now following ${followee}`,
        follow: followRecord
    })


}

async function unfollowUserController(req, res) {
    const follower = req.user._id;  // from identifyUser middleware
    const followee = req.params.userid;

    const isUserFollowing = await followModel.findOne({
        follower: follower,
        followee: followee
    })

    if (!isUserFollowing) {
        return res.status(200).json({
            message: `You are not following ${followee}`
        })
    }

    await followModel.findByIdAndDelete(isUserFollowing._id)

    res.status(200).json({
        message: `You have unfollowed ${followee}`
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

    if (!updatedStatus) {
        return res.status(404).json({
            message: "Follow request not found"
        });
    }

    res.status(200).json({
        message: "Status Updated",
        follow: updatedStatus
    });

}

async function getFollowersController(req, res) {
    const userId = req.user.id;

    const followerRecords = await followModel
        .find({
            followee: userId,
            status: "accepted"
        })
        .populate("follower", "username profileImage bio")
        .lean();

    const followers = await Promise.all(
        followerRecords.map(async (followRecord) => {
            const isFollowing = await followModel
                .findOne({
                    follower: userId,
                    followee: followRecord.follower?._id,
                    status: "accepted"
                })
                .lean();

            return {
                ...followRecord,
                isFollowing: Boolean(isFollowing)
            };
        })
    );

    res.status(200).json({
        message: "Followers fetched successfully",
        followers
    });
}

async function getFollowingController(req, res) {
    const userId = req.user.id;

    const followingRecords = await followModel
        .find({
            follower: userId,
            status: "accepted"
        })
        .populate("followee", "username profileImage bio")
        .lean();

    const following = await Promise.all(
        followingRecords.map(async (followRecord) => {
            const isFollowing = await followModel
                .findOne({
                    follower: userId,
                    followee: followRecord.followee?._id,
                    status: 'accepted'
                })
                .lean();

            return {
                ...followRecord,
                isFollowing: Boolean(isFollowing)
            };
        })
    );

    res.status(200).json({
        message: "Following fetched successfully",
        following
    });
}

async function getFollowRequestsController(req, res) {
    const userId = req.user.id;

    const pendingRequests = await followModel
        .find({
            followee: userId,
            status: "pending"
        })
        .populate("follower", "username profileImage bio")
        .lean();

    res.status(200).json({
        message: "Follow requests fetched successfully",
        followRequests: pendingRequests
    });
}

module.exports = {
    followUserController,
    unfollowUserController,
    followStatusController,
    getFollowersController,
    getFollowingController,
    getFollowRequestsController
}