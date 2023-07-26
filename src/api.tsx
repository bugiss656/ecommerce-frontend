import axios from "axios"
import { 
    AxiosInstance, 
    AxiosResponse 
} from 'axios'


const api: AxiosInstance = axios.create({
    baseURL: 'http://localhost:8000/api/'
})

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('authToken')
        if (token) {
            api.defaults.headers.common['Authorization'] = `Token ${token}`
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

export default api