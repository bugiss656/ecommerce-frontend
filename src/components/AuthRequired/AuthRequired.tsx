import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

import useAuthentication from '../../hooks/useAuthentication'

interface AuthRequired {
    children: JSX.Element | null
}


const AuthRequired = ({ children }: AuthRequired) => {
    const { token } = useAuthentication()
    const navigate = useNavigate()

    useEffect(() => {
        const checkIfAuthTokenChanged = (event: any) => {
            if (event.key === 'authToken') {
                navigate('/logowanie')
            }
        }

        window.addEventListener('storage', checkIfAuthTokenChanged)

        return () => {
            window.removeEventListener('storage', checkIfAuthTokenChanged)
        }    
    }, [])

    useEffect(() => {
        if (!token) {
            navigate("/logowanie")
        }
    }, [])

    return children
}

export default AuthRequired