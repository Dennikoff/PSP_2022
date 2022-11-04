import './styles/App.css';
import {BrowserRouter} from "react-router-dom";
import Navbar from "./components/navbar/navbar";
import {useEffect, useState} from "react";
import MyRouter from "./components/router/myRouter";
import json from './json_templates/stat.json'


function App() {
    const [siteStatistics, setSiteStatistics] = useState([])
    const [fullStatistic, setFullStatistics] = useState({
        sites: 0,
        pages: 0,
        lemmas: 0,
        isIndexing: false
    })


    useEffect( () => {
            const fullStat = json['statistics']['total']
            const stat = []
            for(let statistic of json['statistics']['detailed']){

                statistic.statusTime = new Date(statistic.statusTime)
                statistic.statusTime.format = 'DD.MM.YYYY'
                stat.push(statistic)
            }
            setFullStatistics(fullStat)
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
