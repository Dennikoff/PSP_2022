import React, {useEffect, useState} from 'react';
import StatisticContainer from "../../components/statistic_full_container/statisticContainer";
import SiteStatisticList from "../../components/site_statistic_list/site_statistic_list";
import classes from './main_page.module.css'
import json from "../../json_templates/statistic.json";
import {takeStatistic} from "../../api/takeStatistic";
import {useFetching} from "../../hooks/useFetching";
import {startSearch} from "../../api/startSearch";

const MainPage = () => {

    const [siteStatistics, setSiteStatistics] = useState([])
    const [fullStatistic, setFullStatistics] = useState({})   // MAKE SOME CHANGES TO RELOAD DATA
    const [isOpened, setIsOpened] = useState(false)

    const [fetch, isLoading, isError] = useFetching(async () => {
        const response = await takeStatistic()
        setFullStatistics(response.data.statistics.total)
        let stat = []
        for(let statistic of response.data.statistics.detailed) {
            statistic.statusTime = new Date(statistic.statusTime)
            statistic.statusTime.format = 'DD.MM.YYYY'
            stat.push(statistic)
        }
        setSiteStatistics(stat)


    })

    useEffect(() => {
        fetch()
        // const response = await takeStatistic()
        // console.log(response)
        //
        // const stat = []
        // for(let statistic of response.data.statistics.detailed){
        //     statistic.statusTime = new Date(statistic.statusTime)
        //     statistic.statusTime.format = 'DD.MM.YYYY'
        //     stat.push(statistic)
        // }
        // setFullStatistics(fullStat)
        // setSiteStatistics(stat)
        },[])

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