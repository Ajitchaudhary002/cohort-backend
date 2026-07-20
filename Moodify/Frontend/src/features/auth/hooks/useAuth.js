import { useContext, useEffect } from "react";
import { AuthContext } from "../auth.context";
import { login, register, getMe, logout } from "../services/auth.api";

export const useAuth = () => {
    const context = useContext(AuthContext)

    const { user, setUser, loading, setLoading } = context

    async function handleRegister({ username, email, password }) {
        setLoading(true)
        const data = await register({ username, email, password })
        setUser(data.user)
        setLoading(false)
    }

    async function handleLogin({ username, email, password }) {
        setLoading(true)
        const data = await login({ username, email, password })
        setUser(data.user)
        setLoading(false)
    }

    async function handleGetMe() {
        try {
            setLoading(true)
            const data = await getMe()
            setUser(data.user)
        }
        catch (err) {
            console.log(err)
            setUser(null)
        }
        finally {

            setLoading(false)
        }
    }

    async function handleLogout() {
        setLoading(true)
        const data = await logout()
        console.log(data)
        setUser(null)
        setLoading(false)

    }

    useEffect(() => {
        handleGetMe()
    }, [])

    return ({
        user, setLoading, loading, handleGetMe, handleLogin, handleRegister, handleLogout
    })


}

