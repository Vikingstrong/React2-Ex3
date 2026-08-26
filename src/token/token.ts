import axios from 'axios';

console.log("Loaded API URL:", import.meta.env.VITE_BaseAPI);
export const axiosRequest = axios.create(
    { baseURL: import.meta.env.VITE_BaseAPI || 'http://localhost:4000/api' }
)

function getToken() {
    return localStorage.getItem('token')
}
function getRefreshToken() {
    return localStorage.getItem('refreshToken')
}

axiosRequest.interceptors.request.use(
    (config) => {
        let token = getToken()
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

