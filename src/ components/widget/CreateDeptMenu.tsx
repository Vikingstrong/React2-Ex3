import { Button, Dialog, MenuItem, TextField } from "@mui/material";
import { useAtom } from "jotai";
import { X } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { createDeptAtom, type Idebt } from "../../store/debtAtom";

interface Iprops {
    open: boolean;
    handleClose: () => void;
    contactId: string;
}

export interface IDeptForm {
    contact_id: string;
    direction: "they_owe_me" | "i_owe_them";
    amount: number;
    currency: string;
    description: string;
    due_date: string;
}

export default function CreateDeptMenu({ open, handleClose, contactId }: Iprops) {

    const [, createDept] = useAtom(createDeptAtom);

    const {
        register,
        handleSubmit,
        reset,
        setValue
    } = useForm<IDeptForm>({
        defaultValues: {
            contact_id: contactId || "",
            direction: "they_owe_me",
            amount: 0,
            currency: "USD",
            description: "",
            due_date: ""
        }
    });

    useEffect(() => {
        if (contactId) {
            setValue("contact_id", contactId);
        }
    }, [contactId, setValue]);

    const submitCreate = async (data: IDeptForm) => {
        const payload: IDeptForm = {
            ...data,
            amount: Number(data.amount),
            contact_id: contactId
        };
        await createDept(payload as unknown as Idebt);
        handleClose();
        reset();
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <form onSubmit={handleSubmit(submitCreate)} className="p-5 flex flex-col gap-5 w-90 lg:w-130">
                <div className="flex justify-between items-center">
                    <p className="text-lg font-medium">Создать Новый Долг</p>
                    <X onClick={handleClose} className="hover:bg-gray-300/50 transition-all duration-200 cursor-pointer rounded-4xl p-2 w-10 h-10" />
                </div>
                <div className="flex flex-col gap-3">
                    <TextField {...register('direction')} select label="Кто кому должен" defaultValue="they_owe_me">
                        <MenuItem value="they_owe_me">Мне должны</MenuItem>
                        <MenuItem value="i_owe_them">Я должен</MenuItem>
                    </TextField>
                    <TextField {...register('amount', { valueAsNumber: true })} required type="number" label="Сумма" />
                    <TextField {...register('currency')} select label="Валюта" defaultValue="USD">
                        <MenuItem value="USD">USD</MenuItem>
                        <MenuItem value="RUB">RUB</MenuItem>
                    </TextField>
                    <TextField {...register('description')} label="Описание" />
                    <TextField {...register('due_date')} type="date" />
                    <Button type="submit" variant="contained" color="success" sx={{ fontWeight: '700' }}>Create</Button>
                </div>
            </form>
        </Dialog>
    );
}