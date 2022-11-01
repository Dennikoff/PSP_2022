import React, {useState} from 'react';
import classes from './site_statistic.module.css'
import imageOk from '../../img/index_info_ok.png'
import imageProcess from '../../img/index_info_process.png'
import triangle from '../../img/triangle.png'

const SiteStatistic = ({statistic, isOpened, setIsOpened}) => {
    const statisticClasses = [classes.site_statistic_container]
    const trianlgeClasses = [classes.header_triangle]

    if(statistic.isOpened) {
        statisticClasses.push(classes.active)
        trianlgeClasses.push(classes.active)
    }

    return (
        <div className={statisticClasses.join(' ')}>
            <div className={classes.site_statistic_header}>
                <span className={classes.header_name_uri}>
                    {`${statistic.siteName} - ${statistic.siteURI}`}
                </span>

                <div className={classes.header_indexed}>
                    <div className={classes.header_indexed_icon}>
                        {statistic.indexed
                            ? <img src={imageOk} alt="Error"/>
                            : <img src={imageProcess} alt="Error"/>
                        }
                    </div>
                    <div className={classes.header_indexed_text}>
                            {statistic.indexed
                                ? <span>Проиндексирован</span>
                                : <span>Индексация</span>
                            }
                    </div>
                </div>
                <div
                    className={trianlgeClasses.join(' ')}
                    onClick={() => {
                        statistic.isOpened = !statistic.isOpened
                        setIsOpened(!isOpened)
                    }}
                >
                    <img src={triangle} alt=""/>
                </div>
            </div>
            <div className={classes.site_statistic_body}>
                <div className={classes.last_seen_statistic_box}>
                    <div className="last_seen_title">
                        Последние изменения:
                    </div>
                    <div className={classes.date_time}>
                        <div className="last_seen_date">
                            {`${statistic.lastChanged.getDate()}.` +
                                `${statistic.lastChanged.getMonth()}.` +
                                `${statistic.lastChanged.getFullYear()}`}
                        </div>
                        <div className={classes.last_seen_time}>
                            {`${statistic.lastChanged.getHours()}:` +
                                `${statistic.lastChanged.getMinutes()}:` +
                                `${statistic.lastChanged.getSeconds()}`}
                        </div>
                    </div>
                </div>
                <div className={classes.last_seen_statistic_box}>
                    <div className="pages_title">
                        Страницы:
                    </div>
                    <div className="pages_number_last_seen">
                        {statistic.pages}
                    </div>
                </div>
                <div className={classes.last_seen_statistic_box}>
                    <div className="lemmas_title">
                        Леммы:
                    </div>
                    <div className="lemmas_number_last_seen">
                        {statistic.lemmas}
                    </div>
                </div>
                <div className={classes.last_seen_statistic_box}>
                    <div className="error_title">
                        Ошибка:
                    </div>
                    <div className="error_number_last_seen">
                        {statistic.error}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SiteStatistic;