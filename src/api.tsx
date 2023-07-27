import axios, { AxiosHeaders } from "axios"
import { 
    AxiosInstance, 
    AxiosResponse 
} from 'axios'


const api: AxiosInstance = axios.create({
    baseURL: 'http://localhost:8000/api/'
})

api.interceptors.request.use(function (request) {
        const token = localStorage.getItem('authToken')
        if (token) {
            (request.headers as AxiosHeaders).set('Authorization', `Token ${token}`)
        }
        return request
    },
    function (error) {
        return Promise.reject(error)
    }
)

api.interceptors.response.use(
    (response: AxiosResponse) => {
        const newToken = response.headers['new-auth-token']
        if (newToken) {
            localStorage.setItem('authToken', newToken)
        }
        return response
    },
    (error) => {
        if (error.response && error.response.status === 401) {
            // TODO
        }
        return Promise.reject(error)
    }
)

export default api