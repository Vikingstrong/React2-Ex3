import axios from "axios";
import { atom } from "jotai";

const deptsApi = 'http://localhost:4000/api/debts'

export interface Idebt {
  id: string;
  user_id: string;
  contact_id: string;
  direction: "they_owe_me" | "i_owe_them";
  amount: number;
  currency: string;
  description: string;
  due_date: string;
  status: "pending" | "partial" | "paid";
  created_at: string;
  updated_at: string;
}

export const deptsAtom = atom<Idebt[]>([])
export const getDeptsAtom = atom(null, async(_,set,contactId:string) => {
    const token = localStorage.getItem('token')
    try {
        const resp = await axios.get(`${deptsApi}?contact_id=${contactId}`, {
            headers:{
                Authorization: `Bearer ${token}`
            }
        })
        set(deptsAtom, resp.data)
    } catch (error) {
        
    }
})
export const createDeptAtom = atom(null, async(_,set,dept:Idebt) => {
    const token = localStorage.getItem('token')
    try {
        await axios.post(deptsApi, dept, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        set(getDeptsAtom, dept.contact_id)
    } catch (error) {
        
    }
})