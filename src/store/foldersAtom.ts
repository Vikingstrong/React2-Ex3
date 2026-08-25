import axios from "axios";
import { atom } from "jotai";
import type { IContactForm } from "../ components/widget/СreateContactMenu";
import type { Ifolder } from "../pages/Folders";

const folderApi = 'http://localhost:4000/api/folders'
const contactsApi = 'http://localhost:4000/api/contacts'


export const foldersAtom = atom([])
export const selectedFolderAtom = atom<Ifolder | {}>({})

export const contactsAtom = atom([])
export const selectedContactAtom = atom({})

export const getFoldersAtom = atom(null, async(get,set) => {
    const token = localStorage.getItem('token')
    try {
        const resp = await axios.get(folderApi, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        set(foldersAtom, resp.data)
        return resp.data
    } catch (error) {
        console.error(error)
    }
})

export const addFolderAtom = atom(null, async(get,set, newFolder) => {
    const token = localStorage.getItem('token')
    try {
        await axios.post(folderApi, newFolder, {
            headers:{
                Authorization: `Bearer ${token}`
            }
        })
        set(getFoldersAtom)
    } catch (error) {
        console.error(error)
    }
})
export const delFolderAtom = atom(null, async(get,set,id) => {
    const token = localStorage.getItem('token')
    try {
        await axios.delete(`${folderApi}/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        set(getFoldersAtom)
    } catch (error) {
        console.error(error)
    }
})

export const getFolderByIdAtom = atom(null, async(get,set,id) => {
    const token = localStorage.getItem('token')
    try {
        const resp = await axios.get(`${folderApi}/${id}`, {
            headers:{
                Authorization: `Bearer ${token}`
            }
        })
        set(selectedFolderAtom, resp.data)
    } catch (error) {
        console.error(error)   
    }
})

export const getContactsAtom = atom(null, async(get,set,id) => {
    const token = localStorage.getItem('token')
    try {
        const resp = await axios.get(`${contactsApi}?folder_id=${id}`, {
            headers:{
                Authorization: `Bearer ${token}`
            }
        })
        set(contactsAtom, resp.data)
    } catch (error) {
        
    }
})
export const createContactAtom = atom(null, async(get,set,contact:IContactForm) => {
    const token = localStorage.getItem('token')
    try {
        await axios.post(contactsApi, contact, {
            headers:{
                Authorization: `Bearer ${token}`
            }
        })
        set(getContactsAtom, contact.folder_id)
    } catch (error) {
        console.error(error)   
    }
})
export const getContactByIdAtom = atom(null, async (get, set, id: string) => {
    const token = localStorage.getItem('token');
    try {
        const resp = await axios.get(`${contactsApi}/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        set(selectedContactAtom, resp.data);
    } catch (error) {
        console.error(error);
    }
});
export const delContactAtom = atom(null, async(get,set,id:string) => {
    const token = localStorage.getItem('token');
    try {
        await axios.delete(`${contactsApi}/${id}`, {
            headers:{
                Authorization: `Bearer ${token}`
            }
        })
    } catch (error) {
        console.error(error)
    }
})