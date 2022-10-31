import './styles/App.css';
import {BrowserRouter, Link} from "react-router-dom";
import Navbar from "./components/Navbar/navbar";

function App() {
    return (
        <BrowserRouter>
            <Navbar/>
            <div className='body'>

            </div>
        </BrowserRouter>
    );
}

export default App;
