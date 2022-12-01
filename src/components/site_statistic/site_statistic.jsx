import React from 'react'
import classes from './site_statistic.module.css'
import imageOk from '../../img/indexInfoOk.svg'
import imageProcess from '../../img/indexInfoProcess.svg'
import imageError from '../../img/indexInfoError.svg'
import triangle from '../../img/triangle.svg'
import LoadingProcess from "../loadingBars/loadingProcess";


function getDate(date) {
    let str = ''
    if (date.getDate().toString().length < 2) {
        str = str + `0${date.getDate().toString()}.`
    } else {
        str = str + date.getDate().toString() + '.'
    }
    if (date.getMonth().toString().length < 2) {
        str = str + `0${(date.getMonth() + 1).toString()}.`
    } else {
        str = str + (date.getMonth() + 1).toString() + '.'
    }
    str += date.getFullYear().toString()
    return str
}

function getTime(date) {
    let str = ''
    if (date.getHours().toString().length < 2) {
        str = str + `0${date.getHours().toString()}:`
    } else {
        str = str + date.getHours().toString() + ':'
    }
    if (date.getMinutes().toString().length < 2) {
        str = str + `0${date.getMinutes().toString()}:`
    } else {
        str = str + date.getMinutes().toString() + ':'
    }
    if (date.getSeconds().toString().length < 2) {
        str = str + `0${date.getSeconds().toString()}`
    } else {
        str = str + date.getSeconds().toString()
    }
    return str
}

const SiteStatistic = ({statistic, isOpened, setIsOpened}) => {
    const statisticClasses = [classes.site_statistic_container]
    const triangleClasses = [classes.header_triangle]

    if (statistic.isOpened) {
        statisticClasses.push(classes.active)
        triangleClasses.push(classes.active)
    }

    return (<div className={statisticClasses.join(' ')}>
            <div className={classes.site_statistic_header}
                 onClick={() => {
                     statistic.isOpened = !statistic.isOpened
                     setIsOpened(!isOpened)
                 }}
            >
                <span className={classes.header_name_uri}>
                    {`${statistic.name} - ${statistic.url}`}
                </span>

                <div className={classes.header_indexed}>
                    <div className={classes.header_indexed_icon}>
                        {statistic.status === "INDEXED" ?
                            <img src={imageOk} alt="Error"/>
                            : statistic.status === 'INDEXING'
                                ? <LoadingProcess/>
                                : <img src={imageError} alt="Error"/>}
                    </div>
                    <div className={classes.header_indexed_text}>
                        {statistic.status === "INDEXED" ?
                            <span>Проиндексирован</span>
                            : statistic.status === 'INDEXING'
                                ? <span>Индексация</span>
                                : <span>Ошибка</span>}
                    </div>
                </div>
                <div
                    className={triangleClasses.join(' ')}
                >
                    <img src={triangle} alt="error"
                         style={{"width": "2vw"}}/>
                </div>
            </div>
            <div className={classes.site_statistic_body}>
                <div className={classes.site_statistic_box}>
                    <div className={classes.statistic_site_title}>
                        Последние изменения:
                    </div>
                    <div className={classes.date_time}>
                        <div className="last_seen_date">
                            {getDate(statistic.statusTime)}
                        </div>
                        <div className={classes.last_seen_time}>
                            {getTime(statistic.statusTime)}
                        </div>
                    </div>
                </div>
                <div className={classes.site_statistic_box}>
                    <div className={classes.statistic_site_title}>
                        Страницы:
                    </div>
                    <div className="pages_number_last_seen">
                        {statistic.pages}
                    </div>
                </div>
                <div className={classes.site_statistic_box}>
                    <div className={classes.statistic_site_title}>
                        Леммы:
                    </div>
                    <div className="lemmas_number_last_seen">
                        {statistic.lemmas}
                    </div>
                </div>
                {
                    statistic.error &&
                    <div className={classes.site_statistic_box}>
                        <div className={classes.statistic_site_title}>
                            Ошибка:
                        </div>
                        <div className="error_number_last_seen">
                            {statistic.error}
                        </div>
                    </div>
                }
            </div>
        </div>

    );
};

export default SiteStatistic;