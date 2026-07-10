
import { useAuth } from "../../auth/hooks/useAuth";
import '../styles/follow.scss'
import { getFollowing } from "../services/profile.api";
import { useEffect, useState } from "react";

const FollowingList = () => {

    const { user } = useAuth();
    const [following, setFollowing] = useState([]);

    useEffect(() => {
        const fetchFollowing = async () => {
            const data = await getFollowing();
            setFollowing(data.following);
        };

        fetchFollowing();
    }, []);

    if (!user) {
        return <p>Loading...</p>;
    }

    return (
        <div className="follower-list">
            <h1>following list</h1>
            {following.map((followingData) => {

                return <div key={followingData._id} className="follower-item">
                    <img src={followingData.followee.profileImage} alt="" />
                    <p>{followingData.followee.username}</p>
                    <button className="button">{followingData.isFollowing ? 'following' : 'follow'}</button>
                </div>

            })}
        </div>
    )
}

export default FollowingList