import { createContext, useState } from "react";
import { getMe } from './services/auth.api'
import { useEffect } from "react";
const AuthContext = createContext();

export { AuthContext }

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => async () => {
        const response = await getMe();
        setUser(response.user)
        console.log(response)
    }, [])

    return (
        <AuthContext.Provider value={{ user, setUser, loading, setLoading }}>
            {children}
        </AuthContext.Provider>
    )
}