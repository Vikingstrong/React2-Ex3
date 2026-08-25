import { Button } from "@mui/material";
import { useAtom, useAtomValue } from "jotai";
import { NavLink, useParams } from "react-router";
import { contactsAtom, getContactsAtom, getFolderByIdAtom, selectedFolderAtom } from "../store/foldersAtom";
import { useEffect, useState } from "react";
import { Folder, UserPlus, Users } from "lucide-react";
import CreateContactMenu from '../ components/widget/СreateContactMenu'
import type { Ifolder } from "./Folders";

export interface Icontact{
  id:string,
  user_id: string,
  folder_id: string,
  name: string,
  phone: string,
  email: string,
  note: string,
  created_at: string,
  updated_at: string
}

export default function FolderInfo() {
  const { id } = useParams();
  const mainFolder = useAtomValue(selectedFolderAtom) as Ifolder | null;
  const [, getFolder] = useAtom(getFolderByIdAtom);

  const contacts = useAtomValue(contactsAtom)
  const [,getContacts] = useAtom(getContactsAtom)

  useEffect(() => {
    getFolder(id);
  }, []);
  useEffect(() => {
    getContacts(id)
  },[])

  console.log(contacts);

  const folderColor = mainFolder?.color || "#10B981";

  
  const [open, setOpen] = useState(false)
  const handleClose = (value?: boolean) => {
    setOpen(value ?? false);
  };
  return (
    <div className="max-w-300 m-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-8">
      <div className="flex justify-between">

        <div className="flex items-center gap-4 z-10">
          <div
            className="p-3.5 rounded-xl border border-slate-700/50 shadow-inner flex items-center justify-center"
            style={{ backgroundColor: `${folderColor}15` }}>
            <Folder
              className="w-8 h-8"
              style={{ fill: folderColor, stroke: folderColor }}
              />
          </div>
          <div className="flex flex-col">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">{mainFolder?.name || "Загрузка..."}</h1>
            <p className="text-slate-400 text-sm mt-0.5 flex items-center gap-2">Папка контактов и долгов</p>
          </div>
        </div>
        
        <Button
          variant="contained"
          color="success"
          startIcon={<UserPlus className="w-5 h-5" />}
          onClick={() => setOpen(true)}
          sx={{ borderRadius: "12px", textTransform: "none", fontWeight: 600, px: 3, py: 1.2, zIndex: 10,}}>
          Добавить новый контакт
        </Button>
      </div>
      <section className="flex flex-col gap-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-emerald-400" />
            <h2 className="text-xl font-bold text-white">Список контактов</h2>
          </div>
        </div>

        {
          contacts.length < 1 ?
          <div className="flex flex-col items-center justify-center py-16 px-4 rounded-2xl bg-slate-900/30 border border-dashed border-slate-800 text-center">
            <Users className="w-12 h-12 text-slate-600 mb-3" />
            <p className="text-slate-300 font-medium text-base">Контактов пока нет</p>
            <p className="text-slate-500 text-sm mt-1 max-w-xs">Нажмите «Добавить новый контакт», чтобы привязать должника или кредитора к этой папке.</p>
          </div>
          :
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {
              contacts.map((contact:Icontact) => (
                <NavLink to={`/folders/${id}/contacts/${contact.id}`} key={contact.id}>
                  <div className="flex flex-col w-full lg:flex-row text-center lg:text-start text-gray-200 lg:w-90 lg:h-20 items-center gap-5 p-5 rounded-lg border border-blue-900 bg-slate-900/50 transition-all group hover:bg-slate-800/50 cursor-pointer">
                    <UserPlus/>
                    <div className="flex flex-col ">
                      <p>Name: <span className="font-bold">{contact.name}</span> </p>
                      <p>Phone: <span className="font-bold">{contact.phone}</span></p>
                    </div>
                  </div>
                </NavLink>
              ))
            }
          </div>
        }
      </section>

      <CreateContactMenu open={open} handleClose={() => handleClose(false)} folderId={id || ''} >

      </CreateContactMenu>
    </div>
  );
}