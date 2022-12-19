import './styles/App.css';
import {BrowserRouter} from "react-router-dom";
import Navbar from "./components/navbar/navbar";
import MyRouter from "./components/router/myRouter";
import React, {useEffect, useState} from 'react'
import {ThemeContext} from "./context/themContext";
import {storage} from "./storage/storage";
import {AuthContext} from "./context/authContext";


const getTheme = () => {

    let theme = storage.get('theme')
    if (theme === undefined) {
        console.log("UNDEFINED THEME")
        const darkThemeMq = window.matchMedia("(prefers-color-scheme: light)");
        theme = darkThemeMq.matches;
    }
    return theme

}

function App() {
    const [isAuth, setIsAuth] = useState(false)
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
                    <Navbar/>
                    <MyRouter/>
                </AuthContext.Provider>
            </ThemeContext.Provider>
        </BrowserRouter>
    )
}

export default App;
