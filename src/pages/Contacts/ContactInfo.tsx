import { useAtom, useAtomValue } from "jotai"
import { useNavigate, useParams } from "react-router"
import { delContactAtom, getContactByIdAtom, selectedContactAtom } from "../../store/foldersAtom"
import { useEffect, useState } from "react"
import { User, Phone, Mail, FileText, ArrowLeft, ArrowDownLeft, ArrowUpRight, CheckCircle2, Clock, AlertCircle } from "lucide-react"
import type { Icontact } from "../FolderInfo"
import { Button } from "@mui/material"
import { deptsAtom, getDeptsAtom, type Idebt } from "../../store/debtAtom"
import CreateDeptMenu from "../../ components/widget/CreateDeptMenu"

export default function ContactInfo() {

  const { contactId } = useParams<{ contactId: string }>()
  const navigate = useNavigate()

  const [, getInfo] = useAtom(getContactByIdAtom)
  const info = useAtomValue(selectedContactAtom) as Icontact | null
  
  const [, delContact] = useAtom(delContactAtom)
  const handleDelete = async () => {
    if (contactId) {
      await delContact(contactId)
      navigate(-1)
    }
  }
  const debts = useAtomValue(deptsAtom)
  const [,getDepts] = useAtom(getDeptsAtom)

  useEffect(() => {
    if (contactId) {
      getInfo(contactId)
      getDepts(contactId)
    }
  }, [contactId])


  const [open, setOpen] = useState(false)

  if (info)
    return (
      <>
        <section className="max-w-300 m-auto flex flex-col gap-6 p-4">

          <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors w-fit text-sm font-medium cursor-pointer">
            <ArrowLeft className="w-4 h-4" /> Назад
          </button>

          <div className="flex flex-col md:flex-row gap-6 w-full p-6 items-start md:items-center justify-between bg-slate-900/60 border border-slate-800 rounded-2xl shadow-xl">
            <div className="flex items-center gap-5">
              <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl text-emerald-400">
                <User className="w-12 h-12" />
              </div>
              
              <div className="flex flex-col gap-1.5">
                <h2 className="text-2xl font-extrabold text-white">{info.name}</h2>
                <div className="flex flex-wrap items-center gap-4 text-sm text-slate-400 mt-0.5">
                  {info.phone && (
                    <span className="flex items-center gap-1.5 text-slate-300 font-medium">
                      <Phone className="w-4 h-4 text-emerald-400" />
                      {info.phone}
                    </span>
                  )}
                  {info.email && (
                    <span className="flex items-center gap-1.5 text-slate-400">
                      <Mail className="w-4 h-4 text-slate-500" />
                      {info.email}
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div className="flex gap-3 items-center w-full md:w-auto justify-end">
              <Button onClick={() => setOpen(true)} variant="contained" color="success" sx={{ borderRadius: "10px", fontWeight: 700, textTransform: "none", px: 3, fontSize: 20 }}>Add Depts</Button>
              <Button variant="contained" color="warning" sx={{ borderRadius: "10px", fontWeight: 700, textTransform: "none", px: 3, fontSize: 20 }}>Edit</Button>
              <Button onClick={handleDelete} variant="contained" color="error" sx={{ borderRadius: "10px", fontWeight: 700, textTransform: "none", px: 3, fontSize: 20 }}>Delete</Button>
            </div>
          </div>
          {info.note && (
            <div className="p-4 rounded-xl bg-slate-900/30 border border-slate-800/80 flex items-start gap-3">
              <FileText className="w-5 h-5 text-slate-500 shrink-0 mt-0.5" />
              <div className="flex flex-col gap-1">
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Заметка</p>
                <p className="text-sm text-slate-200">{info.note}</p>
              </div>
            </div>
          )}
          <div className="flex flex-col gap-4 mt-2">
            <h3 className="text-xl font-bold text-white">Список долгов</h3>
            {!debts || debts.length === 0 ? (
              <div className="p-8 text-center rounded-2xl bg-slate-900/30 border border-dashed border-slate-800 text-slate-400 text-sm">  У этого контакта пока нет записей о долгах.</div>
            ) : (
              <div className="grid grid-cols-1 gap-3">
                {debts.map((debt: Idebt) => {
                  const isTheyOwe = debt.direction === "they_owe_me"
                  return (
                    <div 
                      key={debt.id} 
                      className="flex items-center justify-between p-4 bg-slate-900/60 border border-slate-800 rounded-xl hover:border-slate-700 transition-all"
                    >
                      <div className="flex items-center gap-4">
                        <div className={`p-2.5 rounded-xl ${isTheyOwe ? "bg-emerald-500/10 text-emerald-400" : "bg-rose-500/10 text-rose-400"}`}>
                          {isTheyOwe ? <ArrowDownLeft className="w-5 h-5" /> : <ArrowUpRight className="w-5 h-5" />}
                        </div>
                        
                        <div className="flex flex-col gap-0.5">
                          <p className="font-semibold text-slate-200">{debt.description || "Без описания"}</p>
                          <span className="text-xs text-slate-400">
                            {debt.due_date ? `Срок: ${new Date(debt.due_date).toLocaleDateString()}` : "Срок не указан"}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold ${
                          debt.status === "paid" 
                            ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" 
                            : debt.status === "partial" 
                            ? "bg-amber-500/10 text-amber-400 border border-amber-500/20" 
                            : "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                        }`}>
                          {debt.status === "paid" && <CheckCircle2 className="w-3.5 h-3.5" />}
                          {debt.status === "partial" && <Clock className="w-3.5 h-3.5" />}
                          {debt.status === "pending" && <AlertCircle className="w-3.5 h-3.5" />}
                          {debt.status}
                        </span>

                        <span className={`font-extrabold text-lg ${isTheyOwe ? "text-emerald-400" : "text-rose-400"}`}>
                          {isTheyOwe ? "+" : "-"}{debt.amount} {debt.currency || "USD"}
                        </span>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>

        </section>

        <CreateDeptMenu open={open} handleClose={() => setOpen(false)} contactId={contactId || ''}/>
      </>
    )
}