
import { NavLink } from "react-router"
import '../styles/userinfo.scss'

const UserInfo = ({ user }) => {
    if (!user) {
        return (
            <div className="user-info">
                <p className="user-loading">Loading profile...</p>
            </div>
        )
    }
    return (
        <div className="user-info">
            <div className="upper-info">
                <img src={user.profileImage} alt="" className="profile-pic" />

                <NavLink
                    to="/profile/posts"
                    className={({ isActive }) =>
                        isActive ? "active" : ""
                    }
                >
                    <p>{user.postCount}</p>
                    <p>posts</p>

                </NavLink>
                <NavLink
                    to="/profile/followers"
                    className={({ isActive }) =>
                        isActive ? "active" : ""
                    }
                >
                    <p>{user.followersCount}</p>
                    <p>followers</p>

                </NavLink>

                <NavLink
                    to="/profile/following"
                    className={({ isActive }) =>
                        isActive ? "active" : ""
                    }
                >
                    <p>{user.followingCount}</p>
                    <p>following</p>

                </NavLink>

                <NavLink
                    to="/profile/follow-requests"
                    className={({ isActive }) =>
                        isActive ? "active" : ""
                    }
                >
                    <p className="req">Requests</p>
                </NavLink>
            </div>

            <div className="lower-info">
                <h2 className="user-name">{user.username}</h2>
                <p className="user-bio">{user.bio || "No bio yet."}</p>
            </div>
        </div>
    )
}

export default UserInfo
