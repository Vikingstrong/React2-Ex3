import { atom } from "jotai";
import { axiosRequest } from "../token/token";

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

export interface IPayment {
  id: string;
  debt_id: string;
  amount: number;
  note?: string;
  paid_at?: string;
  created_at?: string;
}

export const deptsAtom = atom<Idebt[]>([]);
export const selectedDeptAtom = atom<Idebt | null>(null);
export const paymentsAtom = atom<IPayment[]>([]);

export const getDeptsAtom = atom(null, async (_, set, contactId: string) => {
    try {
        const resp = await axiosRequest.get(`/debts?contact_id=${contactId}`);
        set(deptsAtom, resp.data);
    } catch (error) {
        console.error(error);
    }
});

export const getDeptByIdAtom = atom(null, async (_, set, id: string) => {
    try {
        const resp = await axiosRequest.get(`/debts/${id}`);
        set(selectedDeptAtom, resp.data);
        return resp.data;
    } catch (error) {
        console.error(error);
    }
});

export const createDeptAtom = atom(null, async (_, set, dept: Partial<Idebt>) => {
    try {
        await axiosRequest.post('/debts', dept);
        if (dept.contact_id) {
            set(getDeptsAtom, dept.contact_id);
        }
    } catch (error) {
        console.error(error);
    }
});

export const editDeptAtom = atom(null, async (_, set, dept: Partial<Idebt>, id: string, contactId?: string) => {
    try {
        const resp = await axiosRequest.patch(`/debts/${id}`, dept);
        set(selectedDeptAtom, resp.data);
        if (contactId) {
            set(getDeptsAtom, contactId);
        }
    } catch (error) {
        console.error(error);
    }
});

export const delDeptAtom = atom(null, async (_, set, id: string, contactId?: string) => {
    try {
        await axiosRequest.delete(`/debts/${id}`);
        if (contactId) {
            set(getDeptsAtom, contactId);
        }
    } catch (error) {
        console.error(error);
    }
});

export const getPaymentsAtom = atom(null, async (_, set, debtId: string) => {
    try {
        const resp = await axiosRequest.get(`/debts/${debtId}/payments`);
        set(paymentsAtom, resp.data);
    } catch (error) {
        console.error(error);
    }
});

export const createPaymentAtom = atom(null, async (_, set, debtId: string, payment: { amount: number; note?: string; paid_at?: string }, contactId?: string) => {
    try {
        await axiosRequest.post(`/debts/${debtId}/payments`, payment);
        set(getPaymentsAtom, debtId);
        if (contactId) {
            set(getDeptsAtom, contactId);
        }
    } catch (error) {
        console.error(error);
    }
});