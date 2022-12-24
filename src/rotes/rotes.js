import MainPage from "../pages/mainPage/mainPage";
import ManagementPage from "../pages/managementPage/managementPage";
import SearchPage from "../pages/searchPage/searchPage";
import ProfilePage from "../pages/profilePage/profilePage";
import LoginPage from "../pages/account/loginPage/loginPage";
import {Navigate} from "react-router-dom";

export const privateRoutes = [
    {path: '/', element: <MainPage/>},
    {path: '/management', element: <ManagementPage/>},
    {path: '/search', element: <SearchPage/>},
    {path: '/profile', element: <ProfilePage/>},
    {path: '*', element: <Navigate to="/" replace />}

]


export const publicRoutes = [
    {path: '/login', element: <LoginPage/>},
    {path: '*', element: <Navigate to="/login" replace />}
]