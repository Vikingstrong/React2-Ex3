import axios from 'axios';
import { atom } from 'jotai';

const apiAuth = 'http://localhost:4000/api/auth'

export const userToken = atom<string | null>(localStorage.getItem('token'))

export const regAtom = atom(null, async (_, set, userData) => {
    try {
        const resp = await axios.post(`${apiAuth}/register`, userData)
        const { accessToken, refreshToken } = resp.data;
        if (accessToken) {
            localStorage.setItem('token', accessToken)
            localStorage.setItem('refreshToken', refreshToken)
            set(userToken, accessToken)

            localStorage.setItem('name', resp.data.user.name)
        }
    } catch (error) {

    }
})
export const loginAtom = atom(null, async (get, set, userData) => {
    try {
        const resp = await axios.post(`${apiAuth}/login`, userData)
        console.log(resp.data)
        const { accessToken, refreshToken } = resp.data;
        if (accessToken) {
            localStorage.setItem('token', accessToken)
            if (refreshToken) {
                localStorage.setItem('refreshToken', refreshToken)
            }
            set(userToken, accessToken)

            localStorage.setItem('name', resp.data.user.name)
        }
    } catch (error) {

    }
})