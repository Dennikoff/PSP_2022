import './styles/App.css';
import {BrowserRouter} from "react-router-dom";
import Navbar from "./components/navbar/navbar";
import PublicRouter from "./components/router/publicRouter";
import React, {useEffect, useState} from 'react'
import {ThemeContext} from "./context/themContext";
import {storage} from "./storage/storage";
import {AuthContext} from "./context/authContext";
import PrivateRouter from "./components/router/privateRouter";
import PrivatePage from "./pages/privatePage/privatePage";


const getTheme = () => {

    let theme = storage.get('theme')
    if (theme === undefined) {
        const darkThemeMq = window.matchMedia("(prefers-color-scheme: light)");
        theme = darkThemeMq.matches;
    }
    return theme

}

const getAuth = () => {
    let isAuth = storage.get('isAuth')
    if(isAuth === undefined) {
        isAuth = false
    }
    return isAuth
}

function App() {
    const [isAuth, setIsAuth] = useState(getAuth())
    console.log(isAuth)
    const theme = getTheme()
    const authContext = {
        isAuth,
        setIsAuth
    }
    const themeContext = {
        theme: theme,
        toggleTheme: () => {
            storage.set('theme', !theme)
            window.location.reload()
        }
    }
    useEffect(() => {
        if (theme) {
            import('./styles/lightTheme.css')
        } else {
            import('./styles/darkTheme.css')
        }
    }, [])
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
