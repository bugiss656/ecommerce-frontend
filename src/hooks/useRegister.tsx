import api from "../api"
import { useState } from "react"
import { AxiosError } from "axios"


type RegistrationData = (
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    // phone: string
) => Promise<void>


export const useRegister = () => {
    const [isRegistrationSuccess, setIsRegistrationSuccess] = useState(false)
    const [error, setError] = useState('')

    const register: RegistrationData = async (email, password, firstName, lastName) => {
        try {
            await api.post('customers/register/', { 
                email: email, 
                password: password, 
                first_name: firstName, 
                last_name: lastName 
            }, {
                headers: {
                    'Content-Type': 'application/json' 
                }
            })
            setIsRegistrationSuccess(true)
        } catch (error: any | AxiosError) {
            if (error.response.data.email && error.response.status === 400) {
                setIsRegistrationSuccess(false)
                console.error('Registration failed', error)
                setError('Ten adres email jest już zajęty. Podaj inny adres lub odzyskaj hasło.')
            }
        }
    }

    return { register, isRegistrationSuccess, error }
}