import MainPage from "../pages/mainPage/mainPage";
import ManagementPage from "../pages/managementPage/managementPage";
import SearchPage from "../pages/searchPage/searchPage";
import ProfilePage from "../pages/profilePage/profilePage";
import LoginPage from "../pages/account/loginPage/loginPage";
import {Navigate} from "react-router-dom";
import RegistrationPage from "../pages/account/registration/registrationPage";
import ConfirmEmail from "../pages/account/registration/confirmEmail";
import RecoverPassword from "../pages/account/recoverPassword";

export const privateRoutes = [
    {path: '/', element: <MainPage/>},
    {path: '/management', element: <ManagementPage/>},
    {path: '/search', element: <SearchPage/>},
    {path: '/profile', element: <ProfilePage/>},
    {path: '*', element: <Navigate to="/" replace />}

]


export const publicRoutes = [
    {path: '/login', element: <LoginPage/>},
    {path: '/registration', element: <RegistrationPage/>},
    {path: '/email-confirm', element: <ConfirmEmail/>},
    {path: '/password-recover', element: <RecoverPassword/>},
    {path: '*', element: <Navigate to="/login" replace />}
]