import { Button, Dialog, TextField } from "@mui/material";
import { useAtom } from "jotai";
import { X } from "lucide-react";
import { useForm } from "react-hook-form";
import { createContactAtom } from "../../store/foldersAtom";




interface Iprops {
    open: boolean;
    handleClose: (value?: boolean) => void;
    folderId: string;
}
export interface IContactForm{
    name: string;
    phone: string;
    email: string;
    note: string;
    folder_id:string;
}

export default function СreateContactMenu({open, handleClose, folderId}:Iprops) {

    const [,createContact] = useAtom(createContactAtom)

    const {
        register,
        handleSubmit,
        reset
    } = useForm<IContactForm>({
        defaultValues:{
            name: '',
            phone: '',
            email: '',
            note: '',
            folder_id: folderId
        }
    })

    const submitCreate = async(data:IContactForm) => {
        await createContact({...data, folder_id: folderId})
        handleClose()
        reset()
    }

  return (
    <Dialog open={open}>
        <form onSubmit={handleSubmit(submitCreate)} className="p-5 flex flex-col gap-5 w-90 lg:w-130">
            <div className="flex justify-between items-center">
                <p className="text-lg font-medium">Создать Новый Контакт</p>
                <X onClick={handleClose} className="hover:bg-gray-300/50 transition-all duration-200 cursor-pointer rounded-4xl p-2 w-10 h-10"/>
            </div>
            <div className="flex flex-col gap-3">
                <TextField {...register('name')} required label="Name"/>
                <TextField {...register('phone')} required type="tel" label="Phone"/>
                <TextField {...register('email')} required type="email" label="Email"/>
                <TextField {...register('note')} required label="Note"/>
                <Button type="submit" variant="contained" color="success" sx={{fontWeight: '700'}}>Create</Button>
            </div>
        </form>
    </Dialog>
  )
}
