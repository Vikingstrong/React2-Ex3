import { createBrowserRouter, RouterProvider } from "react-router"
import Layout from "./Layout/Layout"
import { lazy } from "react"

const HomePg = lazy(() => import("./pages/Home"))
const InfoPG = lazy(() => import("./pages/Info"))

const LoginPG = lazy(() => import('./pages/Auth/Login'))
const RegisterPG = lazy(() => import('./pages/Auth/Register'))

const ProfilePG = lazy(() => import('./pages/Profile'))

const FoldersPG = lazy(() => import('./pages/Folders'))
const FolderInfoPg = lazy(() => import('./pages/FolderInfo'))

const ContactInfoPG = lazy(() => import('./pages/Contacts/ContactInfo'))

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout/>,
    children:[
      {
        index: true,
        element: <HomePg/>
      },
      {
        path: "info",
        element: <InfoPG/>
      },
      {
        path: "login",
        element: <LoginPG/>
      },
      {
        path: "register",
        element: <RegisterPG/>
      },
      {
        path: "profile",
        element: <ProfilePG/>
      },
      {
        path: "folders",
        element: <FoldersPG/>
      },
      {
        path: "folders/:id",
        element: <FolderInfoPg/>
      },
      {
        path: "folders/:folderId/contacts/:contactId", //
        element: <ContactInfoPG />
      }
    ]
  }
])

export default function App(){

  return (
    <RouterProvider router={router}></RouterProvider>
  )
}