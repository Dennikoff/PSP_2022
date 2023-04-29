import React, {useEffect, useState} from 'react';
import ResultSiteElement from "../resultSiteElement/resultSiteElement";
import classes from './resultSiteList.module.css'

import loginPage from "../../pages/account/loginPage/loginPage";

const ResultSiteList = ({sites, result, page, setPage, limit}) => {


    return (
        <div className={classes.resultList}>
            {sites.map((site) =>
                <ResultSiteElement
                    site={site}
                    key={site.uri}
                />
            )}
        </div>
    )

};

export default ResultSiteList;