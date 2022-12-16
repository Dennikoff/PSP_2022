import './styles/App.css';
import {BrowserRouter} from "react-router-dom";
import Navbar from "./components/navbar/navbar";
import MyRouter from "./components/router/myRouter";
import {ThemeContext} from './context/ThemContext'
import React, {useEffect, useState} from 'react'




function App() {
    const [theme, setTheme] = useState(false)
    const context = {
        theme: theme,
        toggleTheme: () => setTheme(!theme)
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
