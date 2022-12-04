import React, {useEffect, useState} from 'react';
import StatisticContainer from "../../components/statistic_full_container/statisticContainer";
import SiteStatisticList from "../../components/site_statistic_list/site_statistic_list";
import classes from './main_page.module.css'
import {takeStatistic} from "../../api/takeStatistic";
import {useFetching} from "../../hooks/useFetching";
import {useFetchingWithTimeout} from "../../hooks/useFetchingWithTimeout";

let flag = true
const MainPage = () => {

    const [siteStatistics, setSiteStatistics] = useState([])
    const [fullStatistic, setFullStatistics] = useState({
        sites: 0,
        lemmas: 0,
        pages: 0
    })   // MAKE SOME CHANGES TO RELOAD DATA
    const [isOpened, setIsOpened] = useState(false)

    const [fetch, isLoading, setIsLoading, isError] = useFetchingWithTimeout(async () => {
        let start = new Date()
        const response = await takeStatistic()
        let end = new Date()
        let delay = 600 - (end - start)
        if(delay > 0) {
            setTimeout(() => {
                setFullStatistics(response["data"]["statistics"]["total"])
                let stat = []
                for (let statistic of response["data"]["statistics"]["detailed"]) {
                    statistic.statusTime = new Date(statistic.statusTime)
                    statistic.statusTime.format = 'DD.MM.YYYY'
                    stat.push(statistic)
                }
                setSiteStatistics(stat)
                setIsLoading(false)
            }, delay)
        } else {
            setFullStatistics(response["data"]["statistics"]["total"])
            let stat = []
            for (let statistic of response["data"]["statistics"]["detailed"]) {
                statistic.statusTime = new Date(statistic.statusTime)
                statistic.statusTime.format = 'DD.MM.YYYY'
                stat.push(statistic)
            }
            setSiteStatistics(stat)
            setIsLoading(false)
        }

    })

    useEffect(() => {
        if(flag) {
            flag = false
            let timerId = setInterval(() => {
                fetch()
                console.log("fetching data")
            }, 10000);
        }
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
    }, [])

    return (
        <div className={classes.main__body}>
            <div className={classes.main__title}>
                <h1>Главная</h1>
            </div>
            <StatisticContainer
                fullStatistic={fullStatistic}
                isLoading={isLoading}
            />
            <SiteStatisticList
                    siteStatistics={siteStatistics}
                    isOpened={isOpened}
                    setIsOpened={setIsOpened}
                />
            {/*{isLoading */}
            {/*    ? <SiteStatisticList*/}
            {/*        siteStatistics={siteStatistics}*/}
            {/*        isOpened={isOpened}*/}
            {/*        setIsOpened={setIsOpened}*/}
            {/*    />*/}
            {/*    : <div className={classes.loaderContainer}>*/}
            {/*        <LoadingStatistic style={{"marginTop": "5vh"}}/>*/}
            {/*    </div>*/}
            {/*}*/}
        </div>
    );
};
export default MainPage;