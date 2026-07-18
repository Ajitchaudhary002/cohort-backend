import { useAuth } from "../hooks/useAuth"
import { Navigate } from "react-router"

const Protected = ({ children }) => {

    const { setLoading, loading, user } = useAuth()
    console.log(user)

    if (user == null) {
        setLoading(false)
    }

    if (!loading && !user) {
        return <Navigate to='/login' />
    }

    if (loading) {
        return <h1>loading...</h1>
    }

    return children
}

export default Protected