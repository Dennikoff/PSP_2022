import React, {useEffect, useState} from 'react';
import StatisticContainer from "../../components/statistic_full_container/statisticContainer";
import SiteStatisticList from "../../components/site_statistic_list/site_statistic_list";
import classes from './main_page.module.css'
import json from "../../json_templates/statistic.json";
import {takeStatistic} from "../../api/takeStatistic";

const MainPage = () => {

    const [siteStatistics, setSiteStatistics] = useState([])
    const [fullStatistic, setFullStatistics] = useState({})
    const [jsonInfo, setJsonInfo] = useState(json) //make
    const [isOpened, setIsOpened] = useState(false)

    useEffect(() => {
        takeStatistic(setJsonInfo)
        },[])

    useEffect(() => {
        const fullStat = jsonInfo['statistics']['total']
        const stat = []
        for(let statistic of jsonInfo['statistics']['detailed']){

            statistic.statusTime = new Date(statistic.statusTime)
            statistic.statusTime.format = 'DD.MM.YYYY'
            stat.push(statistic)
        }
        setFullStatistics(fullStat)
        setSiteStatistics(stat)
    },[jsonInfo])

    return (
        <div className={classes.main__body}>
            <div className={classes.main__title}>
                <h1>Главная</h1>
            </div>
            <StatisticContainer
                fullStatistic={fullStatistic}
            />
            <SiteStatisticList
                siteStatistics={siteStatistics}
                isOpened={isOpened}
                setIsOpened={setIsOpened}
            />
        </div>
    );
};

export default MainPage;