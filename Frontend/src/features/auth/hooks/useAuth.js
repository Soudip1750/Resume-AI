import { useContext, useEffect } from "react";
import { AuthContext } from "../auth.context";
import { login, register, logout, getme } from "../services/auth.api";

export const useAuth = () => {
    const {user, setUser, loading, setLoading} = useContext(AuthContext)

    const handleLogin = async ({email, password}) => {
        setLoading(true)
        const data = await login({email, password})
        try {
            setUser(data.user)
        } catch (err) {
            console.log(err.data)
        }
        finally {
            setLoading(false)
        }
    }

    const handleRegiter = async ({username, email, password}) => {
        setLoading(true)
        const data = await register({username, email, password})
        try {
            setUser(data.user)
        } catch (err) {
            console.log(err.data)
        }
        finally {
            setLoading(false)
        }
    }

    const handleLogout = async () => {
        setLoading(true)
        const data = await logout()
        try {
            setUser(data.user)
        } catch (err) {
            console.log(err.data)
        }
        finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        const getAndSetUser = async ()=> {
            const data = await getme()
            setUser(data.user)
            setLoading(false)
        }

        getAndSetUser()
    
    }, [])

    return ({user, loading, handleLogin, handleLogout, handleRegiter})
}