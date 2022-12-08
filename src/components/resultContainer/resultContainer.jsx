import React from 'react';
import classes from "./resultContainer.module.css";
import ResultSiteList from "../resultSiteList/resultSiteList";
import LoadingSearch from "../loadingBars/loadingSearch";

//http://localhost:8080/api/updateLink?url=https://www.playback.ru&isSelected=1
const ResultContainer = ({sites, isLoading, result, page, setPage, isError}) => {
    return (
        <div className={classes.result_container}>
            <h3 className={classes.result_title}>
                Результаты:
            </h3>
            <div className={classes.result_sites_container}>
                {
                    isLoading
                        ?
                        <div className={classes.loadingCircle}>
                            <LoadingSearch/>
                        </div>
                        :
                        // isError
                        //     ?
                        //     <div>
                        //         {console.log(isError)}
                        //     </div>
                        //     :
                            sites.length > 0 &&
                                <ResultSiteList sites={sites}
                                                result={result}
                                                page={page}
                                                setPage={setPage}
                                />

                }
            </div>
        </div>
    );
};

export default ResultContainer;