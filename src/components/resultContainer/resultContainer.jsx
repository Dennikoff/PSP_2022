import React from 'react';
import classes from "./resultContainer.module.css";
import ResultSiteList from "../resultSiteList/resultSiteList";
import LoadingSearch from "../loadingBars/loadingSearch";
import {Paginator} from 'primereact/paginator';

const ResultContainer = ({sites, isLoading, result, page, setPage, isError, flag, limit}) => {
    return (
        <div className={classes.result_container}>
            <h3 className={classes.result_title}>
                Результаты:
            </h3>
            <div className={classes.result_sites_container}>
                {
                    // isLoading
                    //     ?
                    //     <div className={classes.loadingCircle}>
                    //         <LoadingSearch/>
                    //     </div>
                    //     :
                    // isError
                    //     ?
                    //     <div>
                    //         {console.log(isError)}
                    //     </div>
                    //     :
                    sites.length > 0
                        ?
                        <ResultSiteList sites={sites}
                                        result={result}
                                        page={page}
                                        setPage={setPage}
                                        limit={limit}
                        />
                        :
                        flag && <h1 className={classes.placeholder}>Поиск не дал результатов</h1>
                }
            </div>
            <div className={classes.paginatorContainer}>
                <Paginator
                    first={page}
                    rows={10}
                    totalRecords={result.count}
                    onPageChange={(e) => {
                        setPage(e.first)
                    }}
                />
            </div>
        </div>
    );
};

export default ResultContainer;