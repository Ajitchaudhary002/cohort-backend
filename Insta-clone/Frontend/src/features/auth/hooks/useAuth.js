import { useContext } from "react";
import { AuthContext } from "../../auth.context.jsx";

export function useAuth() {

    const context = useContext(AuthContext);

    return context
    //AuthContext provides: auth, loading, handleLogin, handleRegister,
    // by returning context, we can access these values in any component that calls useAuth()
}