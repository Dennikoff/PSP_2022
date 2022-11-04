import React from 'react';
import SiteStatistic from "../site_statistic/site_statistic";
import classes from './site_statistic_list.module.css'
import {CSSTransition, TransitionGroup} from "react-transition-group"
import "../site_statistic/siteStatistic.css"

const SiteStatisticList = ({siteStatistics, isOpened, setIsOpened}) => {
    return (
        <div className={classes.statistic_site_list}>
            <TransitionGroup>
                {siteStatistics.map((stat) =>
                        <SiteStatistic
                            isOpened={isOpened}
                            setIsOpened={setIsOpened}
                            statistic={stat}
                        />
                )}
            </TransitionGroup>
        </div>

    );
};

export default SiteStatisticList;