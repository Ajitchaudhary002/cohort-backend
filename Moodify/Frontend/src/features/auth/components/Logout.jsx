import { useAuth } from "../hooks/useAuth"
import { useNavigate } from "react-router"

const Logout = () => {

    const { handleLogout } = useAuth()
    const navigate = useNavigate()

    async function Logout() {
        await handleLogout()
        navigate('/login')
    }

    return (
        <div>
            <button className="button" style={{marginLeft:'10px'}} onClick={Logout}>Logout</button>
        </div>
    )
}

export default Logout
