import {  useState } from "react"


const useAuthentication = () => {
    const [token, setToken] = useState<string | null>(localStorage.getItem("authToken"))

    return { token }
}

export default useAuthentication