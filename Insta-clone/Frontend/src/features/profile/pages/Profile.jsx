import UserInfo from "../components/UserInfo"
import '../styles/userinfo.scss'
import { useAuth } from "../../auth/hooks/useAuth"
import { Outlet, useNavigate } from "react-router"

const Profile = () => {

    const { user } = useAuth()
    const navigate = useNavigate()

    return (
        <main className="profile-page">
            <div className="profile">
                <h1 className="home" onClick={() => navigate('/')}>
                    home
                </h1>

                <UserInfo user={user} />
                <div className="profile-outlet">
                    <Outlet />
                </div>

            </div>
        </main>
    )
}

export default Profile
