import React from 'react';
import './statistic.module.css'
import classes from './statistic.module.css'
import LoadingStatistic from "../loadingBars/loadingStatistic";
import LoadingStatisticSmall from "../loadingBars/loadingStatisticSmall";

const Statistic = ({value, isLoading, title}) => {

    function getNoun(number, one, two, five) {
        let n = Math.abs(number);
        n %= 100;
        if (n >= 5 && n <= 20) {
            return five;
        }
        n %= 10;
        if (n === 1) {
            return one;
        }
        if (n >= 2 && n <= 4) {
            return two;
        }
        return five;
    }

    return (
        <div className={classes.mainStatisticContainer}>
            {!isLoading
                ? <div className={classes.mainStatistic}>
                    <p className={classes.text}>
                        {value}
                    </p>
                    <p className={classes.text}>
                        {getNoun(value, title[0], title[1], title[2] )}
                    </p>
                </div>
                : <div className={classes.loaderContainer}>
                    <LoadingStatisticSmall/>
                </div>
            }
        </div>
    );
};

export default Statistic;