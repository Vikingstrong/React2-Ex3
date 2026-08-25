import { useAtom, useAtomValue } from "jotai"
import { userToken } from "../store/authAtom"
import { NavLink, useNavigate } from "react-router"
import { delFolderAtom, foldersAtom, getFoldersAtom } from "../store/foldersAtom"
import { Button, Menu } from "@mui/material"
import { EllipsisVertical, Folder, Info, Pencil, Plus, Trash2 } from "lucide-react"
import React, { useEffect, useState } from "react"
import CreateFolderMenu from "../ components/widget/CreateFolderMenu"
import EditFolderMenu from "../ components/widget/EditFolderMenu"


export interface Ifolder{
    id: string,
    user_id: string,
    name: string,
    color: string,
    created_at: string,
    updated_at: string
}


export default function Folders() {
    const token = useAtomValue(userToken)
    const navigate = useNavigate()

    const folders = useAtomValue(foldersAtom)
    const [, getFolders] = useAtom(getFoldersAtom)
    const [, delFolder] = useAtom(delFolderAtom)

    useEffect(() => {
        getFolders()
    }, [])

    const [openCreate, setOpenCreate] = useState(false)
    const [openEdit, setOpenEdit] = useState(false)
    const [folderToEdit, setFolderToEdit] = useState<Ifolder | null>(null)


    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const [selectedFolder, setSelectedFolder] = useState<Ifolder | null>(null);

    const open = Boolean(anchorEl)
    const handleOpen = (e: React.MouseEvent<HTMLElement>, folder: Ifolder) => {
      setAnchorEl(e.currentTarget);
      setSelectedFolder(folder);
    };
    const handleClose = () => {
        setAnchorEl(null)
        setSelectedFolder(null)
    }

    if(!token){
        navigate('/login')
    }
    return (
        <>
            <div className="flex max-w-300 m-auto pt-10 flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-slate-800">
                <div>
                    <h1 className="text-3xl font-extrabold text-white">Мои Папки</h1>
                    <p className="text-slate-400 text-sm mt-1">Организуйте свои долги и контакты по категориям</p>
                </div>
                <Button
                    onClick={() => setOpenCreate(true)} 
                    variant="contained" 
                    color="success"
                    startIcon={<Plus className="w-5 h-5" />}
                    sx={{ borderRadius: '12px', textTransform: 'none', fontWeight: 600, px: 3 }}
                >
                    Создать папку
                </Button>
            </div>
            <section className="flex max-w-300 m-auto w-full px-5 lg:px-0 py-10">
                {
                    folders.length < 1 ? 
                    <div className="flex justify-center w-full text-4xl font-semibold lg:py-40">
                        <h1>Not Have Folders</h1>
                    </div>
                    :
                    <div className="flex flex-wrap gap-5">
                        {
                            folders.map((folder:Ifolder) => (
                                <div key={folder.id} className="group overflow-hidden relative">
                                <EllipsisVertical onClick={(e) => handleOpen(e as unknown as React.MouseEvent<HTMLElement>, folder)} className="absolute z-10 cursor-pointer w-8 h-8 p-1 -right-7 top-2 group-hover:-translate-x-8 transition-all hover:bg-[#2a2b2b87] rounded-4xl" color="#ffffff" />
                                <NavLink to={`/folders/${folder.id}`}>
                                    <div className="flex cursor-pointer lg:w-35 gap-3 items-center flex-col p-8 rounded-lg bg-slate-900/40 border border-slate-800/80 hover:border-slate-700/80 hover:bg-slate-800/50 transition-all duration-200">
                                        <Folder 
                                            style={{
                                              fill: folder.color,
                                              stroke: folder.color,
                                              filter: "drop-shadow(0px 4px 10px rgba(0, 0, 0, 0.3))",
                                            }}
                                            className="w-10 h-10"
                                        />
                                        <p className="font-semibold">{folder.name}</p>
                                    </div>
                                </NavLink>
                                </div>
                            ))
                        }
                    </div>
                }
            </section>

            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                slotProps={{
                   paper: {
                     sx: {
                       bgcolor: "#0f172a", 
                       color: "#ffffff",
                       border: "1px solid #1e293b",
                       borderRadius: "12px",
                       boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.5)",
                     },
                   },
                 }}
            >
                <div className="flex flex-col gap-5 p-4">
                    <div onClick={() => {
                        if (selectedFolder) 
                            delFolder(selectedFolder.id);
                            handleClose()
                        }} className="flex items-center gap-3 rounded-lg p-2 text-white cursor-pointer bg-red-800 transition-all hover:bg-red-500 hover:scale-110">
                        <Trash2 />
                    </div>
                    <div onClick={() => {
                        if (selectedFolder) {
                            setFolderToEdit(selectedFolder)
                            setOpenEdit(true)
                            setAnchorEl(null)
                        }
                    }} className="flex items-center gap-3 rounded-lg p-2 text-white cursor-pointer bg-orange-600 transition-all hover:bg-orange-400 hover:scale-110">
                        <Pencil />
                    </div>
                    <div className="flex items-center gap-3 rounded-lg p-2 text-white cursor-pointer bg-blue-800 transition-all hover:bg-blue-500 hover:scale-110">
                        <NavLink to={`/folders/${selectedFolder?.id}`}>
                            <Info />
                        </NavLink>
                    </div>
                </div>
            </Menu>

            <CreateFolderMenu open={openCreate} onClose={() => setOpenCreate(false)}/>
            <EditFolderMenu open={openEdit} onClose={() => { setOpenEdit(false); setFolderToEdit(null); }} folder={folderToEdit}/>
        </>
    )
}
