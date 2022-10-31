import React from 'react';
import Statistic from "../statistic_full/statistic";
import classes from './statisticContainer.module.css'

const StatisticContainer = () => {
    return (
        <div className={classes.main__statistics_container}>
            <Statistic title='Сайтов' value={15}/>
            <Statistic title='Страниц' value={13214}/>
            <Statistic title='Лемм' value={501040205}/>
        </div>
    );
};

export default StatisticContainer;