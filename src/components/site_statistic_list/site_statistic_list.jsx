import React from 'react';
import SiteStatistic from "../site_statistic/site_statistic";
import classes from './site_statistic_list.module.css'

const SiteStatisticList = ({siteStatistics, isOpened, setIsOpened}) => {
    return (
        <div className={classes.statistic_site_list} >
            {siteStatistics.map((stat) =>
                <SiteStatistic
                    isOpened={isOpened}
                    setIsOpened={setIsOpened}
                    statistic={stat}
                    key={stat.siteURI}
                />
            )}
        </div>
    );
};

export default SiteStatisticList;