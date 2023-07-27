import api from "../api"
import { useState } from "react"


const useGetUserData = () => {
    const [user, setUser] = useState('')
    
    const getUserData = async () => {
        try {
            const response = await api.get('customers/user')
            setUser(response.data)
        } catch (error) {
            console.error('Getting user data failed', error)
        }
    }

    return { getUserData, user }
}

export default useGetUserData