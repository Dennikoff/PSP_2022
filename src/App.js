import './styles/App.css';
import {BrowserRouter, Link} from "react-router-dom";
import Navbar from "./components/navbar/navbar";
import {useState} from "react";
import MyRouter from "./components/router/myRouter";

function App() {

    const [siteStatistics, setSiteStatistics] = useState([
        {   siteName: 'Сайт дельфинов',
            siteURI: 'https://site.ru',
            indexed: false,
            lastChanged: new Date(2015, 1, 20),
            pages: 10000,
            lemmas: 100412,
            error: "Some error: error",
            isOpened: false
        },
        {   siteName: 'Сайт собак',
            siteURI: 'https://site2.ru',
            indexed: true,
            lastChanged: new Date(2017, 1, 12),
            pages: 10000,
            lemmas: 100412,
            error: "Some error: error",
            isOpened: false
        },
        {   siteName: 'Сайт людей',
            siteURI: 'https://site3.ru',
            indexed: true,
            lastChanged: new Date(2012, 1, 10),
            pages: 10000,
            lemmas: 100412,
            error: "Some error: error",
            isOpened: false
        },
        {   siteName: 'Сайт людей',
            siteURI: 'https://site4.ru',
            indexed: true,
            lastChanged: new Date(2012, 1, 10),
            pages: 10000,
            lemmas: 100412,
            error: "Some error: error",
            isOpened: false
        }
    ])

    return (
        <BrowserRouter>
            <Navbar/>
            <MyRouter statistic={siteStatistics}/>
        </BrowserRouter>
    );
}

export default App;
