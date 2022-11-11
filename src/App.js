import './styles/App.css';
import {BrowserRouter} from "react-router-dom";
import Navbar from "./components/navbar/navbar";
import MyRouter from "./components/router/myRouter";


function App() {

    return (
        <BrowserRouter>
            <Navbar/>
            <MyRouter/>
        </BrowserRouter>
    )
}

export default App;
