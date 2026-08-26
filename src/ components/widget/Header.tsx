import { Button } from "@mui/material";
import { NavLink } from "react-router";
import { userToken } from "../../store/authAtom";
import { useAtomValue } from "jotai";


export default function Header() {

    const tokenValue = useAtomValue(userToken)    

    return (
      <>
          <header className="flex justify-between gap-5 max-w-300 m-auto py-10 p-5 lg:px-0 items-center">
              <h1 className="text-4xl font-bold">Debt</h1>
              <nav className="hidden lg:flex gap-10 text-xl">
                  <NavLink to="/">Главная</NavLink>
                  <NavLink to="/folders">Папки</NavLink>
                  <NavLink to="/info">Информация</NavLink>
              </nav>
              <div className="flex gap-5">
                {tokenValue ? 
                    <NavLink to='profile' className="text-2xl font-bold">Profile</NavLink>
                :
                <>
                    <NavLink to='login'>
                        <Button variant="contained" color="success">Login</Button>
                    </NavLink>
                    <NavLink to='register'>
                        <Button variant="contained" color="success">Register</Button>
                    </NavLink>
                </>
                }
              </div>
          </header> 

      </>
    )
}
