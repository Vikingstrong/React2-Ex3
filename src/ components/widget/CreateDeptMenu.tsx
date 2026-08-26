import { Button, Dialog, MenuItem, TextField } from "@mui/material";
import { useAtom } from "jotai";
import { X, Plus } from "lucide-react";
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

const darkInputSx = {
    "& .MuiOutlinedInput-root": {
        color: "#f8fafc",
        backgroundColor: "#0b1120",
        borderRadius: "10px",
        "& fieldset": { borderColor: "#334155" },
        "&:hover fieldset": { borderColor: "#64748b" },
        "&.Mui-focused fieldset": { borderColor: "#10b981" },
    },
    "& .MuiInputLabel-root": { color: "#94a3b8" },
    "& .MuiInputLabel-root.Mui-focused": { color: "#10b981" },
    "& .MuiSelect-icon": { color: "#94a3b8" },
    "& input[type='date']::-webkit-calendar-picker-indicator": {
        filter: "invert(1)",
        cursor: "pointer"
    }
};

const selectSlotProps = {
    select: {
        MenuProps: {
            slotProps: {
                paper: {
                    sx: {
                        bgcolor: "#0f172a",
                        color: "#ffffff",
                        border: "1px solid #1e293b"
                    }
                }
            }
        }
    }
};

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
        <Dialog 
            open={open} 
            onClose={handleClose}
            slotProps={{
                paper: {
                    sx: {
                        bgcolor: "#0f172a",
                        color: "#ffffff",
                        border: "1px solid #1e293b",
                        borderRadius: "20px",
                        backgroundImage: "none",
                        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.7)",
                    }
                }
            }}
        >
            <form onSubmit={handleSubmit(submitCreate)} className="p-6 flex flex-col gap-5 w-90 sm:w-115 lg:w-130">
                <div className="flex justify-between items-center border-b pb-4 border-slate-800">
                    <div className="flex items-center gap-3">
                        <div className="p-2.5 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400">
                            <Plus className="w-5 h-5" />
                        </div>
                        <p className="text-lg font-bold text-white">Создать Новый Долг</p>
                    </div>
                    <X onClick={handleClose} className="hover:bg-slate-800 text-slate-400 hover:text-white transition-all duration-200 cursor-pointer rounded-xl p-1.5 w-8 h-8" />
                </div>

                <div className="flex flex-col gap-3.5">
                    <TextField 
                        {...register('direction')} 
                        select 
                        label="Кто кому должен" 
                        defaultValue="they_owe_me"
                        sx={darkInputSx}
                        slotProps={selectSlotProps}
                        required
                    >
                        <MenuItem value="they_owe_me">Мне должны</MenuItem>
                        <MenuItem value="i_owe_them">Я должен</MenuItem>
                    </TextField>

                    <div className="grid grid-cols-2 gap-3">
                        <TextField 
                            {...register('amount', { valueAsNumber: true })} 
                            required 
                            type="number" 
                            label="Сумма" 
                            sx={darkInputSx}
                        />

                        <TextField 
                            {...register('currency')} 
                            select 
                            label="Валюта" 
                            defaultValue="USD"
                            sx={darkInputSx}
                            slotProps={selectSlotProps}
                        >
                            <MenuItem value="USD">USD</MenuItem>
                            <MenuItem value="RUB">RUB</MenuItem>
                            <MenuItem value="EUR">EUR</MenuItem>
                        </TextField>
                    </div>

                    <TextField 
                        {...register('description')} 
                        label="Описание" 
                        sx={darkInputSx}
                        required
                    />

                    <TextField 
                        {...register('due_date')} 
                        type="date" 
                        label="Срок оплаты"
                        slotProps={{ inputLabel: { shrink: true } }}
                        sx={darkInputSx}
                        required
                    />

                    <Button 
                        type="submit" 
                        variant="contained" 
                        color="success" 
                        sx={{ 
                            fontWeight: '700', 
                            borderRadius: '10px', 
                            py: 1.2, 
                            mt: 1, 
                            textTransform: 'none',
                            fontSize: '16px' 
                        }}
                    >
                        Создать долг
                    </Button>
                </div>
            </form>
        </Dialog>
    );
}