import React from 'react';
import classes from "./resultContainer.module.css";
import ResultSiteList from "../resultSiteList/resultSiteList";
const ResultContainer = ({sites}) => {
    return (
        <div className={classes.result_container}>
            <h3 className={classes.result_title}>
                Результаты:
            </h3>
            <div className={classes.result_sites_container}>
                <ResultSiteList sites={sites}/>
            </div>
        </div>
    );
};

export default ResultContainer;