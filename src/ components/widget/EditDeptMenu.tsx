import { Button, Dialog, MenuItem, TextField } from "@mui/material";
import { useAtom } from "jotai";
import { X, Pencil } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { editDeptAtom, type Idebt } from "../../store/debtAtom";

interface Iprops {
    open: boolean;
    handleClose: () => void;
    debt: Idebt | null;
    contactId: string;
}

export interface IEditDeptForm {
    direction: "they_owe_me" | "i_owe_them";
    amount: number;
    currency: string;
    description: string;
    due_date: string;
    status: "pending" | "partial" | "paid";
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

export default function EditDeptMenu({ open, handleClose, debt, contactId }: Iprops) {

    const [, editDept] = useAtom(editDeptAtom);

    const {
        register,
        handleSubmit,
        reset
    } = useForm<IEditDeptForm>({
        defaultValues: {
            direction: "they_owe_me",
            amount: 0,
            currency: "USD",
            description: "",
            due_date: "",
            status: "pending"
        }
    });

    useEffect(() => {
        if (debt && open) {
            reset({
                direction: debt.direction,
                amount: debt.amount,
                currency: debt.currency || "USD",
                description: debt.description || "",
                due_date: debt.due_date ? debt.due_date.slice(0, 10) : "",
                status: debt.status || "pending"
            });
        }
    }, [debt, open, reset]);

    const submitEdit = async (data: IEditDeptForm) => {
        if (debt) {
            const payload = {
                ...data,
                amount: Number(data.amount)
            };
            await editDept(payload, debt.id, contactId);
            handleClose();
        }
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
            <form onSubmit={handleSubmit(submitEdit)} className="p-6 flex flex-col gap-5 w-90 sm:w-115 lg:w-130">
                <div className="flex justify-between items-center border-b pb-4 border-slate-800">
                    <div className="flex items-center gap-3">
                        <div className="p-2.5 bg-amber-500/10 border border-amber-500/20 rounded-xl text-amber-400">
                            <Pencil className="w-5 h-5" />
                        </div>
                        <p className="text-lg font-bold text-white">Редактировать Долг</p>
                    </div>
                    <X onClick={handleClose} className="hover:bg-slate-800 text-slate-400 hover:text-white transition-all duration-200 cursor-pointer rounded-xl p-1.5 w-8 h-8" />
                </div>

                <div className="flex flex-col gap-3.5">
                    <TextField 
                        {...register('direction')} 
                        select 
                        label="Кто кому должен" 
                        defaultValue={debt?.direction || "they_owe_me"}
                        sx={darkInputSx}
                        slotProps={selectSlotProps}
                    >
                        <MenuItem value="they_owe_me">Мне должны</MenuItem>
                        <MenuItem value="i_owe_them">Я должен</MenuItem>
                    </TextField>

                    <TextField 
                        {...register('amount', { valueAsNumber: true })} 
                        required 
                        type="number" 
                        label="Сумма" 
                        sx={darkInputSx}
                    />

                    <div className="grid grid-cols-2 gap-3">
                        <TextField 
                            {...register('currency')} 
                            select 
                            label="Валюта" 
                            defaultValue={debt?.currency || "USD"}
                            sx={darkInputSx}
                            slotProps={selectSlotProps}
                        >
                            <MenuItem value="USD">USD</MenuItem>
                            <MenuItem value="RUB">RUB</MenuItem>
                            <MenuItem value="EUR">EUR</MenuItem>
                        </TextField>

                        <TextField 
                            {...register('status')} 
                            select 
                            label="Статус" 
                            defaultValue={debt?.status || "pending"}
                            sx={darkInputSx}
                            slotProps={selectSlotProps}
                        >
                            <MenuItem value="pending">pending (ожидает)</MenuItem>
                            <MenuItem value="partial">partial (частично)</MenuItem>
                            <MenuItem value="paid">paid (оплачен)</MenuItem>
                        </TextField>
                    </div>

                    <TextField 
                        {...register('description')} 
                        label="Описание" 
                        sx={darkInputSx}
                    />

                    <TextField 
                        {...register('due_date')} 
                        type="date" 
                        label="Срок оплаты"
                        slotProps={{ inputLabel: { shrink: true } }}
                        sx={darkInputSx}
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
                        Сохранить изменения
                    </Button>
                </div>
            </form>
        </Dialog>
    );
}
