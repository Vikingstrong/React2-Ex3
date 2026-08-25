import { Button, Dialog, TextField } from "@mui/material";
import { Icontact } from "../../pages/FolderInfo";
import { useForm } from "react-hook-form";
import { X } from "lucide-react";
import axios from "axios";
import { editContactAtom } from "../../store/foldersAtom";
import { useAtom } from "jotai";
import { useEffect } from "react";


interface Props {
  open: boolean
  handleClose: (value:boolean) => void
  contact: Icontact
  folderId?: string
}


export default function EditContactMenu({open, handleClose, contact, folderId}:Props) {

    const {
        register,
        handleSubmit,
        reset
    } = useForm({
        defaultValues:{
            name: contact.name,
            phone: contact.phone,
            email: contact.email,
            note: contact.note,
            folder_id: folderId,
        }
    })
    const [,editContact] = useAtom(editContactAtom) 
    
    useEffect(() => {
        if (contact && open) {
            reset({
                ...contact,
                folder_id: contact.folder_id || folderId || '',
            });
        }
    }, [contact, folderId, open, reset]);

    const submit = async(data:any) => {
        await editContact(data, contact.id)
        handleClose(false)
    }

    return(
        <Dialog open={open}>
            <form onSubmit={handleSubmit(submit)} className="flex w-100 p-5 flex-col gap-5">
                <div className="flex items-center justify-between text-xl">
                    <p>Изменить контакт</p>
                    <X onClick={() => handleClose(false)} className="w-12 h-12 p-2 rounded-4xl cursor-pointer hover:bg-gray-300/40 transition-all"/>
                </div>
                <div className="flex flex-col gap-3">
                    <TextField required {...register('name')} label="Name"/>
                    <TextField required {...register('phone')} label="Phone"/>
                    <TextField required {...register('email')} label="Email"/>
                    <TextField required {...register('note')} label="Note"/>
                    <Button type="submit" variant="contained" color="success">Save</Button>
                </div>
            </form>
        </Dialog>
    )
}
