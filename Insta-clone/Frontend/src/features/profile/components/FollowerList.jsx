
import { useAuth } from "../../auth/hooks/useAuth";
import '../styles/follow.scss'
import { getFollowers, doFollow } from "../services/profile.api";
import { useEffect, useState } from "react";

const FollowerList = () => {

  const { user } = useAuth();
  const [followers, setFollowers] = useState([]);

  useEffect(() => {
    const fetchFollowers = async () => {
      const data = await getFollowers();
      setFollowers(data.followers);
    };

    fetchFollowers();
  }, []);

  if (!user) {
    return <p>Loading...</p>;
  }

  const followKaro = async (userId) => {
    console.log(userId)
    const response = await doFollow(userId)
    console.log(response)
  }

  return (
    <div className="follower-list">
      <h1>follower list</h1>
      {followers.map((followerData, idx) => {

        return <div key={idx} className="follower-item">
          <img src={followerData.follower.profileImage} alt="" />
          <p>{followerData.follower.username}</p>

          <button onClick={() => {
            const userId = followerData.follower._id
            followKaro(userId)
          }}
            className="button">
            {followerData.isFollowing ? 'following' : 'follow'}
          </button>

        </div>

      })}
    </div>
  )
}

export default FollowerList