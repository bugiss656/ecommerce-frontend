import api from "../api"
import { useState } from "react"


type LoginData = (
    email: string,
    password: string
) => Promise<void>

type ResponseData = {
    token: string
}

export const useLogin = () => {
    const [isLoginSuccess, setIsLoginSuccess] = useState(false)

    const login: LoginData = async (email, password) => {
        try {
            const response = await api.post<ResponseData>('customers/token/', { email, password })
            const { token } = response.data
            localStorage.setItem('authToken', token)
            setIsLoginSuccess(true)
        } catch(error) {
            console.error('Login failed', error)
            setIsLoginSuccess(false)
        }
    }

    return { login, isLoginSuccess }
}