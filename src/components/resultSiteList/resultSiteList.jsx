import React from 'react';
import ResultSiteElement from "../resultSiteElement/resultSiteElement";
import classes from './resultSiteList.module.css'

const ResultSiteList = ({sites}) => {
    console.log(sites)
    return (
        <div className={classes.resultList}>
            {sites.map((site) =>
                <ResultSiteElement
                    site={site}
                    key={site.uri}
                />
            )}
        </div>
    );
};

export default ResultSiteList;