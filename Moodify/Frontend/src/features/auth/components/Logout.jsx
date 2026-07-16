import { useAuth } from "../hooks/useAuth"
import { useNavigate } from "react-router"

const Logout = () => {

    const { loading, handleLogout } = useAuth()
    const navigate = useNavigate()

    async function Logout() {
        await handleLogout()
        navigate('/login')
    }

    if (loading) {
        return <h1>loading...
        </h1>
    }

    return (
        <div>
            <button className="button" onClick={Logout}>Logout</button>
        </div>
    )
}

export default Logout
