import './styles/App.css';
import {BrowserRouter} from "react-router-dom";
import PublicRouter from "./components/router/publicRouter";
import React, {useEffect, useState} from 'react'
import {ThemeContext, themes} from "./context/themContext";
import {storage} from "./storage/storage";
import {AuthContext} from "./context/authContext";
import PrivatePage from "./pages/privatePage/privatePage";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import './styles/lightTheme.css'


const getTheme = () => {
    const theme = storage.get('theme')
    if (Object.values(themes).includes(theme)) return theme

    const userMedia = window.matchMedia('(prefers-color-scheme: light)')
    if (userMedia.matches) return themes.light

    return themes.dark
}

const getAuth = () => {
    let isAuth = storage.get('isAuth')
    if (isAuth === undefined) {
        isAuth = false
    }
    return isAuth
}

function App() {
    const [isAuth, setIsAuth] = useState(getAuth())
    console.log(isAuth)
    const [theme, setTheme] = useState(getTheme())

    const authContext = {
        isAuth,
        setIsAuth
    }

    useEffect(() => {
        console.log(theme)
        document.documentElement.dataset.theme = theme
        storage.set('theme', theme)
    }, [theme])

    const themeContext = {
        theme: theme,
        changeTheme: (cur) => {
            setTheme(cur)
        }
    }

    return (
        <BrowserRouter>
            <ThemeContext.Provider value={themeContext}>
                <AuthContext.Provider value={authContext}>
                    {
                        isAuth
                            ?
                            <PrivatePage/>
                            :
                            <PublicRouter/>
                    }
                </AuthContext.Provider>
            </ThemeContext.Provider>
        </BrowserRouter>
    )
}

export default App;
