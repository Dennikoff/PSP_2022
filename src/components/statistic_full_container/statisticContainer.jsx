import React from 'react';
import Statistic from "../statistic_full/statistic";
import classes from './statisticContainer.module.css'

const StatisticContainer = ({fullStatistic}) => {
    return (
        <div className={classes.main__statistics_container}>
            <Statistic title='Сайтов' value={fullStatistic.sites}/>
            <Statistic title='Страниц' value={fullStatistic.pages}/>
            <Statistic title='Лемм' value={fullStatistic.lemmas}/>
        </div>
    );
};

export default StatisticContainer;