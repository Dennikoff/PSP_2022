import MainPage from "../pages/mainPage/mainPage";
import ManagementPage from "../pages/managementPage/managementPage";
import SearchPage from "../pages/searchPage/searchPage";
import ProfilePage from "../pages/profilePage/profilePage";
import LoginPage from "../pages/login/loginPage";

export const privateRoutes = [
    {path: '/', element: <MainPage/>},
    {path: '/management', element: <ManagementPage/>},
    {path: '/search', element: <SearchPage/>},
    {path: '/profile', element: <ProfilePage/>}

]


export const publicRoutes = [
    {path: '/login', element: <LoginPage/>}
]