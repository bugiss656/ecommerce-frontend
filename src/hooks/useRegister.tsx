import api from "../api"
import { useState } from "react"


type RegistrationData = (
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    phone: string
) => Promise<void>


export const useRegister = () => {
    const [isRegistrationSuccess, setIsRegistrationSuccess] = useState(false)

    const register: RegistrationData = async (email, password, firstName, lastName, phone) => {
        try {
            await api.post('register/', { email, password, firstName, lastName, phone })
            setIsRegistrationSuccess(true)
        } catch (error) {
            console.error('Registration failed', error)
            setIsRegistrationSuccess(false)
        }
    }

    return { register, isRegistrationSuccess }
}