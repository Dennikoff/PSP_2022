import './styles/App.css';
import {BrowserRouter} from "react-router-dom";
import Navbar from "./components/navbar/navbar";
import {useEffect, useState} from "react";
import MyRouter from "./components/router/myRouter";
import json from './json_templates/stat.json'


function App() {
    const [siteStatistics, setSiteStatistics] = useState([
        {   name: 'Сайт дельфинов',
            url: 'https://site.ru',
            status: false,
            statusTime: new Date(2015, 1, 20),
            error: "Some error: error",
            pages: 10000,
            lemmas: 100412,
            isOpened: false
        },
        {   name: 'Сайт собак',
            url: 'https://site2.ru',
            status: true,
            statusTime: new Date(2017, 1, 12),
            error: "Some error: error",
            pages: 10000,
            lemmas: 100412,
            isOpened: false
        },
        {   name: 'Сайт людей',
            url: 'https://site3.ru',
            status: true,
            statusTime: new Date(2012, 1, 10),
            error: "Some error: error",
            pages: 10000,
            lemmas: 100412,
            isOpened: false
        },
        {   name: 'Сайт людей',
            url: 'https://site4.ru',
            status: true,
            statusTime: new Date(2012, 1, 10),
            error: "Some error: error",
            pages: 10000,
            lemmas: 100412,
            isOpened: false
        }
    ])
    const [fullStatistic, setFullStatistics] = useState({
        sites: 0,
        pages: 0,
        lemmas: 0,
        isIndexing: false
    })


    useEffect( () => {
            const fullstat = json['statistics']['total']
            const stat = []
            for(let statistic of json['statistics']['detailed']){

                statistic.statusTime = new Date(statistic.statusTime)
                statistic.statusTime.format = 'DD.MM.YYYY'
                stat.push(statistic)
            }
            setFullStatistics(fullstat)
            setSiteStatistics(stat)
        }, [])

    return (
        <BrowserRouter>
            <Navbar/>
            <MyRouter statistic={siteStatistics}
                      fullStatistic={fullStatistic}/>
        </BrowserRouter>
    )
}

export default App;
