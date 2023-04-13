import React, {useEffect, useState} from 'react';
import ResultSiteElement from "../resultSiteElement/resultSiteElement";
import classes from './resultSiteList.module.css'
import { Paginator } from 'primereact/paginator';
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
            <Paginator
                first={page}
                rows={10}
                totalRecords={result.count}
                onPageChange={(e) => {
                    setPage(e.first)
                }}
            />
            {/*<Pagination page={page}*/}
            {/*            setPage={setPage}*/}
            {/*            totalPages={totalPage}*/}
            {/*/>*/}
        </div>
    );
};

export default ResultSiteList;