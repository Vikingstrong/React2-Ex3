import { Outlet } from "react-router";
import Header from "../ components/widget/Header";
import { useAtom } from "jotai";
import { fetchUserAtom } from "../store/userAtom";
import { useEffect } from "react";



export default function Layout(){

    const [,getUser] = useAtom(fetchUserAtom)
    useEffect(() => {
        getUser()
    }, [])

    return(
        <>
        <Header/>
        <Outlet/>
        </>
    )
}