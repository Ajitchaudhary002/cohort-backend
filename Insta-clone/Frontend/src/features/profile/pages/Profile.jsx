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

                <UserInfo user={user} />
                <Outlet />
                
                <h1 className="home" onClick={() => navigate('/')}>
                    home
                </h1>
            </div>
        </main>
    )
}

export default Profile
