import { Button, Dialog, TextField } from "@mui/material";
import { useAtom } from "jotai";
import { useForm } from "react-hook-form";
import { regAtom } from "../../store/authAtom";
import { NavLink, useNavigate } from "react-router";

interface IRegForm{
    name: string
    email: string
    password: string
}

export default function Register() {

    const [,regUser] = useAtom(regAtom)
    const navigate = useNavigate()

    const {
        register,
        handleSubmit,
        reset
    } = useForm<IRegForm>()

    const submit = async (data: IRegForm) => {
        try {
            await regUser(data);
            navigate('/');
            reset()
        } catch (error) {
            console.error(error);
        }
    };

    return(
        <Dialog open={true}>
            <form onSubmit={handleSubmit(submit)} className="flex flex-col gap-5 p-5 w-full lg:w-100">
                  <TextField {...register('name', {required: 'Введите имя'})}  type="text" placeholder="Name"/>
                  <TextField {...register('email', {required: 'Почта необходима'})} type="email" placeholder="Email"/>
                  <TextField {...register('password', {required: 'Ведите коректный пароль'})} type="password" placeholder="Password"/>
                  <div className="flex justify-center gap-2">
                    <p>Уже есть аккаунт?</p>
                    <NavLink className='text-blue-600 font-bold' to='/login'>Войти</NavLink>
                  </div>
                  <Button type="submit" variant="contained" color="success">REGISTER</Button>
            </form>
        </Dialog>
    )
}
