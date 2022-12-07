import React from 'react';
import classes from "./siteStatisticBodyError.module.css";

const SiteStatisticBodyError = ({statistic}) => {
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

    return (
        <div className={classes.siteStatisticBodyNoError}>
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
            <div className={classes.site_statistic_box}>
                <div className={classes.statistic_site_title}>
                    Ошибка:
                </div>
                <div className="error_number_last_seen">
                    {statistic.error}
                </div>
            </div>
        </div>
    )
};

export default SiteStatisticBodyError;