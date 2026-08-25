import { useEffect, useState } from "react";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { userProfileAtom, fetchUserAtom, editUserAtom } from "../store/userAtom";
import { Pencil } from 'lucide-react'
import { useForm } from "react-hook-form";
import { Button, TextField } from "@mui/material";

interface INewName{
    name: string
}

export default function Profile() {
    const user = useAtomValue(userProfileAtom);
    const fetchUser = useSetAtom(fetchUserAtom);
    const [,editUser] = useAtom(editUserAtom)

    useEffect(() => {
        fetchUser();
    }, []);

    const [statusEdit, setStatusEdit] = useState(false)

    const {
        register,
        handleSubmit,
        reset
    } = useForm<INewName>()

    function changeStatus(name:string){
        setStatusEdit(true)
        reset({
            name: name
        })
    }

    const submit = async(data:INewName)=>{
        try {
            await editUser(data)
            setStatusEdit(false)
        } catch (error) {
            
        }
    }

    if (!user) return <div className="flex justify-center py-25">Загрузка...</div>;
    return (
        <div className="flex flex-col gap-5 max-w-300 m-auto items-center py-10 bg-[#121327] rounded-2xl hover:bg-[#10122f] transition-all duration-300 hover:rounded-4xl">
            <div className="flex flex-col gap-5">
                <h1 className="text-2xl font-bold self-center">Профиль</h1>
                <div className="flex justify-between items-center">
                    {statusEdit ? 
                        <form onSubmit={handleSubmit(submit)} className="flex">  
                            <input {...register('name', {required:"Enter Name"})} className="px-2 py-4 w-full outline-0 border border-gray-700 rounded-l-lg" placeholder="Name"/>
                            <Button type="submit" sx={{borderTopLeftRadius: 0, borderBottomLeftRadius: 0}} variant="contained" color="success">Save</Button>
                        </form>
                        :
                        <>
                            <p className="text-xl font-semibold">Имя: {user.name}</p>
                            <Pencil onClick={() => changeStatus(user.name)} className="w-6 h-6 cursor-pointer" />                    
                        </>
                    }
                </div>
                <div className="flex justify-between">
                    <p className="text-xl font-semibold">Email: {user.email}</p>
                </div>
                <div className="flex justify-between">
                    <p className="text-xl font-semibold">Дата создания аккаунта: {user.created_at.slice(0,10)}</p>
                </div>
            </div>
        </div>
    );
}