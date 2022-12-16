import './styles/App.css';
import {BrowserRouter} from "react-router-dom";
import Navbar from "./components/navbar/navbar";
import MyRouter from "./components/router/myRouter";
import {ThemContext} from "./index";
import React, {useEffect} from 'react'




function App() {
    let flag = React.useContext(ThemContext)
    useEffect(() => {
        if(flag) {
            import('./styles/lightTheme.css')
        } else {
            import('./styles/darkTheme.css')
        }
    }, [flag])
    return (
        <BrowserRouter>
            <Navbar/>
            <MyRouter/>
        </BrowserRouter>
    )
}

export default App;
