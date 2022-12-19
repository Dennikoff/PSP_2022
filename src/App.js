import './styles/App.css';
import {BrowserRouter} from "react-router-dom";
import Navbar from "./components/navbar/navbar";
import MyRouter from "./components/router/myRouter";
import React, {useEffect, useState} from 'react'
import {ThemeContext} from "./context/themContext";
import {storage} from "./storage/storage";



const getTheme = () => {
    let theme = storage.get('theme')
    if(theme === undefined) {
        console.log("UNDEFINED THEME")
        const darkThemeMq = window.matchMedia("(prefers-color-scheme: light)");
        theme = darkThemeMq.matches;
    }
    return theme

}

function App() {
    const [theme, setTheme] = useState(getTheme())
    const context = {
        theme: theme,
        toggleTheme: () => {
            storage.set('theme', !theme)
            setTheme(!theme);
            window.location.reload()
        }
    }

    useEffect(() => {
        if(theme) {
            import('./styles/lightTheme.css')
            console.log('I am here 1')
        } else {
            import('./styles/darkTheme.css')
            console.log('I am here 2')
        }
        console.log('I am here 3')
    }, [theme])
    return (
        <BrowserRouter>
        <ThemeContext.Provider value={context}>
            <Navbar/>
            <MyRouter/>
        </ThemeContext.Provider>
        </BrowserRouter>
    )
}

export default App;
