import React, {useState} from 'react';
import ResultSiteElement from "../resultSiteElement/resultSiteElement";
import classes from './resultSiteList.module.css'
import Pagination from "../pagination/pagination";

const ResultSiteList = ({sites, result, page, setPage, limit}) => {

    const totalPage = Math.ceil(result.count / limit)
    return (
        <div className={classes.resultList}>
            {sites.map((site) =>
                <ResultSiteElement
                    site={site}
                    key={site.uri}
                />
            )}
            <Pagination page={page}
                        setPage={setPage}
                        totalPages={totalPage}
            />
        </div>
    );
};

export default ResultSiteList;