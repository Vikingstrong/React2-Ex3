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

axiosRequest.interceptors.response.use(
    (response) => {
        return response
    },
    async (error) => {
        const originalRequest = error.config

        if (error?.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true
            let refreshToken = getRefreshToken()

            if (refreshToken) {
                try {
                    const baseURL = import.meta.env.VITE_BaseAPI || 'http://localhost:4000/api'
                    const resp = await axios.post(`${baseURL}/auth/refresh`, {
                        refreshToken: refreshToken
                    })

                    const { accessToken, refreshToken: newRefreshToken } = resp.data

                    if (accessToken) {
                        localStorage.setItem('token', accessToken)
                        if (newRefreshToken) {
                            localStorage.setItem('refreshToken', newRefreshToken)
                        }

                        originalRequest.headers['Authorization'] = `Bearer ${accessToken}`
                        return axiosRequest(originalRequest)
                    }
                } catch (refreshError) {
                    localStorage.removeItem('token')
                    localStorage.removeItem('refreshToken')
                    localStorage.removeItem('name')
                    window.location.href = '/login'
                    return Promise.reject(refreshError)
                }
            }
        }

        return Promise.reject(error)
    }
)