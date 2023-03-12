import React from 'react';
import Statistic from "../statistic_full/statistic";
import classes from './statisticContainer.module.css'

const StatisticContainer = ({fullStatistic, isLoading}) => {
    return (
        <div className={classes.contentContainer}>
            <div className={classes.main__statistics_container}>
                <Statistic
                    title={['Сайт', 'Сайта', 'Сайтов']}
                    value={fullStatistic.sites}
                    isLoading={isLoading}/>
                <Statistic
                    title={['Страница', 'Страницы', 'Страниц']}
                    value={fullStatistic.pages}
                    isLoading={isLoading}/>
                <Statistic
                    title={['Лемма', 'Леммы', 'Лемм']}
                    value={fullStatistic.lemmas}
                    isLoading={isLoading}/>
            </div>
        </div>
    );
};

export default StatisticContainer;