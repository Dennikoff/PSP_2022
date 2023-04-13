import React from 'react';
import SiteStatistic from "../site_statistic/site_statistic";
import classes from './site_statistic_list.module.css'

const SiteStatisticList = ({isOpenedArr, siteStatistics, isOpened, setIsOpened, fetchWithoutLoading}) => {
    return (
        <div className={classes.statistic_site_list}>
                {siteStatistics.map((stat, index) =>
                        <SiteStatistic
                            isOpenedArr={isOpenedArr}
                            index={index}
                            isOpened={isOpened}
                            setIsOpened={setIsOpened}
                            statistic={stat}
                            key={stat.url}
                            fetchWithoutLoading={fetchWithoutLoading}
                        />
                )}
        </div>

    );
};

export default SiteStatisticList;