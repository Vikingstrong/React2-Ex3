import { Button, Dialog, TextField } from "@mui/material";
import { useAtom, useAtomValue } from "jotai";
import { X, CreditCard, Plus, Clock, CheckCircle2 } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { createPaymentAtom, getPaymentsAtom, paymentsAtom, deptsAtom, type Idebt, type IPayment } from "../../store/debtAtom";

interface Iprops {
    open: boolean;
    handleClose: () => void;
    debt: Idebt | null;
    contactId: string;
}

interface IPaymentForm {
    amount: number;
    note: string;
    paid_at: string;
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
    "& input[type='date']::-webkit-calendar-picker-indicator": {
        filter: "invert(1)",
        cursor: "pointer"
    }
};

export default function DebtPaymentsMenu({ open, handleClose, debt, contactId }: Iprops) {

    const payments = useAtomValue(paymentsAtom);
    const allDebts = useAtomValue(deptsAtom);
    const [, getPayments] = useAtom(getPaymentsAtom);
    const [, createPayment] = useAtom(createPaymentAtom);

    // Live debt data from Jotai store
    const currentDebt = allDebts.find((d) => d.id === debt?.id) || debt;

    const totalPaid = payments.reduce((acc, p) => acc + Number(p.amount || 0), 0);
    const remaining = currentDebt ? Math.max(0, currentDebt.amount - totalPaid) : 0;

    const todayDate = new Date().toISOString().slice(0, 10);

    const {
        register,
        handleSubmit,
        reset
    } = useForm<IPaymentForm>({
        defaultValues: {
            amount: 0,
            note: "",
            paid_at: todayDate
        }
    });

    useEffect(() => {
        if (debt && open) {
            getPayments(debt.id);
            reset({
                amount: 0,
                note: "",
                paid_at: todayDate
            });
        }
    }, [debt, open, getPayments, reset, todayDate]);

    const submitPayment = async (data: IPaymentForm) => {
        if (debt) {
            const payload = {
                amount: Number(data.amount),
                note: data.note || "",
                paid_at: data.paid_at ? new Date(data.paid_at).toISOString() : new Date().toISOString()
            };
            await createPayment(debt.id, payload, contactId);
            reset({
                amount: 0,
                note: "",
                paid_at: todayDate
            });
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
            <div className="p-6 flex flex-col gap-5 w-90 sm:w-115 lg:w-130 max-h-[85vh] overflow-y-auto">
                
                {/* Header */}
                <div className="flex justify-between items-center border-b pb-4 border-slate-800">
                    <div className="flex items-center gap-3">
                        <div className="p-2.5 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400">
                            <CreditCard className="w-5 h-5" />
                        </div>
                        <div>
                            <p className="text-lg font-bold text-white">История платежей</p>
                            {currentDebt && (
                                <p className="text-xs text-slate-400">
                                    {currentDebt.description || "Долг"} • Статус: <span className="font-semibold text-emerald-400">{currentDebt.status}</span>
                                </p>
                            )}
                        </div>
                    </div>
                    <X onClick={handleClose} className="hover:bg-slate-800 text-slate-400 hover:text-white transition-all duration-200 cursor-pointer rounded-xl p-1.5 w-8 h-8" />
                </div>

                {/* Balance summary cards */}
                {currentDebt && (
                    <div className="grid grid-cols-3 gap-2 bg-slate-900/80 border border-slate-800 text-white p-3.5 rounded-xl text-center">
                        <div className="flex flex-col">
                            <span className="text-[11px] text-slate-400 uppercase tracking-wider font-medium">Сумма долга</span>
                            <span className="font-bold text-sm sm:text-base mt-0.5">{currentDebt.amount} {currentDebt.currency}</span>
                        </div>
                        <div className="flex flex-col border-x border-slate-800">
                            <span className="text-[11px] text-emerald-400 uppercase tracking-wider font-medium">Оплачено</span>
                            <span className="font-bold text-sm sm:text-base text-emerald-400 mt-0.5">{totalPaid} {currentDebt.currency}</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[11px] text-amber-400 uppercase tracking-wider font-medium">Остаток</span>
                            <span className="font-bold text-sm sm:text-base text-amber-400 mt-0.5">{remaining} {currentDebt.currency}</span>
                        </div>
                    </div>
                )}

                {/* Form to add payment */}
                <form onSubmit={handleSubmit(submitPayment)} className="flex flex-col gap-3.5 bg-slate-900/40 border border-slate-800/90 p-4.5 rounded-xl">
                    <p className="text-sm font-semibold text-slate-200">Внести оплату</p>
                    <div className="flex flex-col gap-3">
                        <div className="flex flex-col sm:flex-row gap-2.5">
                            <TextField
                                {...register('amount', { valueAsNumber: true })}
                                required
                                type="number"
                                size="small"
                                label="Сумма"
                                className="w-full"
                                sx={darkInputSx}
                            />
                            <TextField
                                {...register('paid_at')}
                                type="date"
                                size="small"
                                className="w-full"
                                sx={darkInputSx}
                            />
                        </div>
                        <TextField
                            {...register('note')}
                            size="small"
                            label="Заметка / Примечание"
                            className="w-full"
                            sx={darkInputSx}
                        />
                    </div>
                    <Button
                        type="submit"
                        variant="contained"
                        color="success"
                        startIcon={<Plus className="w-4 h-4" />}
                        sx={{ 
                            fontWeight: '700', 
                            textTransform: 'none', 
                            borderRadius: '10px',
                            py: 1,
                            mt: 0.5
                        }}
                    >
                        Добавить платеж
                    </Button>
                </form>

                {/* Payments list */}
                <div className="flex flex-col gap-3">
                    <p className="text-sm font-semibold text-slate-300">Список выплат:</p>
                    {!payments || payments.length === 0 ? (
                        <div className="p-6 text-center rounded-xl bg-slate-900/20 border border-dashed border-slate-800/80 text-slate-500 text-xs">
                            Платежей пока не было
                        </div>
                    ) : (
                        <div className="flex flex-col gap-2">
                            {payments.map((p: IPayment) => {
                                const paymentDate = p.paid_at || p.created_at;
                                return (
                                    <div key={p.id} className="flex justify-between items-center p-3.5 bg-slate-900/60 border border-slate-800 rounded-xl hover:border-slate-700/80 transition-all">
                                        <div className="flex flex-col gap-0.5">
                                            <span className="font-bold text-emerald-400 text-sm">+{p.amount} {currentDebt?.currency || "USD"}</span>
                                            {p.note && <span className="text-xs text-slate-300">{p.note}</span>}
                                        </div>
                                        {paymentDate && (
                                            <span className="text-xs text-slate-400 flex items-center gap-1">
                                                <Clock className="w-3.5 h-3.5 text-slate-500" />
                                                {new Date(paymentDate).toLocaleDateString()}
                                            </span>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>

                {remaining === 0 && totalPaid > 0 && (
                    <div className="flex items-center justify-center gap-2 p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl text-sm font-medium">
                        <CheckCircle2 className="w-4 h-4" /> Долг полностью погашен!
                    </div>
                )}
            </div>
        </Dialog>
    );
}
