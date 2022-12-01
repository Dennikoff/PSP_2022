import React from 'react';
import Statistic from "../statistic_full/statistic";
import classes from './statisticContainer.module.css'

const StatisticContainer = ({fullStatistic, isLoading}) => {
    return (
        <div className={classes.main__statistics_container}>
            <Statistic
                title='Сайтов'
                value={fullStatistic.sites}
                isLoading={isLoading}/>
            <Statistic
                title='Страниц'
                value={fullStatistic.pages}
                isLoading={isLoading}/>
            <Statistic
                title='Лемм'
                value={fullStatistic.lemmas}
                isLoading={isLoading}/>
        </div>
    );
};

export default StatisticContainer;