import { Button, Dialog, TextField } from "@mui/material";
import { useAtom } from "jotai";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router";
import { loginAtom } from "../../store/authAtom";


interface ILogForm{
    email: string
    password: string
}

export default function Login() {

    const [, loginFunc] = useAtom(loginAtom)
    const navigate = useNavigate()

    const {
        register,
        handleSubmit,
        reset
    } = useForm<ILogForm>()
        
    const submit = async(data:ILogForm) => {
        try {
            await loginFunc(data)
            navigate('/')
            reset()
        } catch (error) {
            
        }
    }

    return(
        <Dialog open={true}>
            <form onSubmit={handleSubmit(submit)} className="flex flex-col w-full lg:w-100 gap-5 p-5">
                  <TextField {...register('email', {required: 'Введите Эмайл'})} placeholder="Email"/>
                  <TextField {...register('password', {required: 'Введите Пароль'})} placeholder="Password"/>
                  <div className="flex justify-center gap-2">
                    <p>Нет аккаунта?</p>
                    <NavLink className='text-blue-600 font-bold' to='/register'>Создать</NavLink>
                  </div>
                  <Button type="password" variant="contained" color="success">Login</Button>
            </form>
        </Dialog>
    )
}
