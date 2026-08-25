import axios from "axios";
import { atom } from "jotai";
import { userToken } from "./authAtom";

const userApi = 'http://localhost:4000/api/users/me';

export interface IUserProfile {
    id: string;
    name: string;
    email: string;
    created_at: string;
}

export const userProfileAtom = atom<IUserProfile | null>(null);

export const fetchUserAtom = atom(null, async (get, set) => {
    const token = get(userToken);
    
    try {
        const resp = await axios.get(userApi, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        
        set(userProfileAtom, resp.data);
        localStorage.setItem('name', resp.data.name)
    } catch (error: any) {
        if (error.response?.status === 401) {
            localStorage.removeItem('token');
            set(userToken, null);
            set(userProfileAtom, null);
        }
    }
});

export const editUserAtom = atom(null, async(get,set,newName) => {
    const token = get(userToken);
    try {
        await axios.patch(userApi,newName,{
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        set(fetchUserAtom)
    } catch (error) {
        
    }
})