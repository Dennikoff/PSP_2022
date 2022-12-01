import React from 'react';
import './statistic.module.css'
import classes from './statistic.module.css'
import LoadingStatistic from "../loadingBars/loadingStatistic";
import LoadingStatisticSmall from "../loadingBars/loadingStatisticSmall";

const Statistic = ({value, title, isLoading}) => {
    return (
        <div className={classes.mainStatisticContainer}>
            {!isLoading
                ? <div className={classes.mainStatistic}>
                    <p>
                        {value}
                    </p>
                    <p>
                        {title}
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