import React, {useEffect, useState} from 'react';
import StatisticContainer from "../../components/statistic_full_container/statisticContainer";
import SiteStatisticList from "../../components/site_statistic_list/site_statistic_list";
import classes from './mainPage.module.css'
import {takeStatistic} from "../../api/takeStatistic";
import {useFetching} from "../../hooks/useFetching";
import {useFetchingWithTimeout} from "../../hooks/useFetchingWithTimeout";
import MainErrorWindow from "../../components/mainErrorWindow/mainErrorWindow";
import {Button} from "primereact/button";
import axios from 'axios'
import {getAuthInfo} from "../../api/user/getAuthInfo";

let isOpenedArr = []
const MainPage = () => {
    const [visible, setVisible] = useState(false)
    const [siteStatistics, setSiteStatistics] = useState([])
    const [fullStatistic, setFullStatistics] = useState({
        sites: 0,
        lemmas: 0,
        pages: 0
    })   // MAKE SOME CHANGES TO RELOAD DATA
    const [isOpened, setIsOpened] = useState(false)

    function handleDeleteButton() {

    }

    const [fetch, isLoading, setIsLoading, isError] = useFetchingWithTimeout(async () => {
        let start = new Date()
        const response = await takeStatistic()
        let end = new Date()
        let delay = 300 - (end - start)
        isOpenedArr = []
        if(delay > 0) {
            setTimeout(() => {
                setFullStatistics(response["data"]["statistics"]["total"])
                let stat = []
                for (let statistic of response["data"]["statistics"]["detailed"]) {
                    statistic.statusTime = new Date(statistic.statusTime)
                    statistic.statusTime.format = 'DD.MM.YYYY'
                    statistic.isOpened = false
                    isOpenedArr.push(false)
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
                statistic.isOpened = false
                isOpenedArr.push(false)
                stat.push(statistic)
            }
            setSiteStatistics(stat)
            setIsLoading(false)
        }
    })
    const [fetchWithoutLoading, isLoadingTimeout, isErrorTimeout] = useFetching(async () => {
        const response = await takeStatistic()
        if(response === undefined) {
            throw '401'
        }
        setFullStatistics(response["data"]["statistics"]["total"])
        let stat = []
        let index = 0
        for (let statistic of response["data"]["statistics"]["detailed"]) {
            statistic.statusTime = new Date(statistic.statusTime)
            statistic.statusTime.format = 'DD.MM.YYYY'
            statistic.isOpened = isOpenedArr[index]
            index++
            stat.push(statistic)
        }
        setSiteStatistics(stat)
    })

    useEffect(() => {
        setIsLoading(false)
        if(isErrorTimeout !== '' && isErrorTimeout !== '401') {
            setVisible(true)
        } else {
            if(visible) {
                setVisible(false)
            }
        }
    }, [isErrorTimeout])

    useEffect(() => {
        (async () => await fetch())()
        let interval = setInterval(() => {
            fetchWithoutLoading("placeholder")
        }, 10000)
        return () => {
            clearInterval(interval)
        }
    }, [])

    return (
        <div className={classes.main__body}>
            {/*{visible &&*/}
            {/*    <MainErrorWindow/>*/}
            {/*}*/}
            <div className={classes.header}>
                <div className={classes.main__title}>
                    <h1>Статистика по индексации</h1>
                </div>
                <StatisticContainer
                    fullStatistic={fullStatistic}
                    isLoading={isLoading}
                />
            </div>
            <SiteStatisticList
                    isOpenedArr={isOpenedArr}
                    siteStatistics={siteStatistics}
                    isOpened={isOpened}
                    setIsOpened={setIsOpened}
                    fetchWithoutLoading={fetchWithoutLoading}
                />
        </div>
    );
};
export default MainPage;