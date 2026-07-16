import { useAuth } from "../hooks/useAuth"
import { Navigate } from "react-router"

const Protected = ({ children }) => {

    const { loading, user } = useAuth()

    if (!loading && !user) {
        return <Navigate to='/login' />
    }

    if (loading) {
        return <h1>loading...</h1>
    }

    return children
}

export default Protected