import { useEffect, useState } from "react";
// import { useAuth } from "../../auth/hooks/useAuth";
import { getFollowRequests, updateFollowStatus } from "../services/profile.api";
import '../styles/follow.scss'

const FollowRequests = () => {
//   const { user } = useAuth();   
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFollowRequests = async () => {
      try {
        const data = await getFollowRequests();
        setRequests(data.followRequests);
      } catch (error) {
        console.error("Error fetching follow requests:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFollowRequests();
  }, []);

  const handleAccept = async (followId, index) => {
    try {
      await updateFollowStatus(followId, 'accepted');
      // Remove the request from the list
      setRequests(requests.filter((_, i) => i !== index));
    } catch (error) {
      console.error("Error accepting follow request:", error);
    }
  };

  const handleReject = async (followId, index) => {
    try {
      await updateFollowStatus(followId, 'rejected');
      // Remove the request from the list
      setRequests(requests.filter((_, i) => i !== index));
    } catch (error) {
      console.error("Error rejecting follow request:", error);
    }
  };

  if (loading) {
    return <p>Loading follow requests...</p>;
  }

  if (requests.length === 0) {
    return <div className="follow-requests"><p>No pending follow requests</p></div>;
  }

  return (
    <div className="follow-requests">
      <h1>Follow Requests</h1>
      {requests.map((request, idx) => (
        <div key={idx} className="request-item">
          <img src={request.follower.profileImage} alt="" />
          <div className="request-info">
            <p className="username">{request.follower.username}</p>
            <p className="bio">{request.follower.bio || "No bio"}</p>
          </div>
          <div className="request-actions">
            <button 
              className="accept-btn"
              onClick={() => handleAccept(request._id, idx)}
            >
              Accept
            </button>
            <button 
              className="reject-btn"
              onClick={() => handleReject(request._id, idx)}
            >
              Reject
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FollowRequests;
